// src/lib/api/interceptors.ts

import axios, { AxiosError, AxiosResponse } from "axios";

import { apiClient, refreshClient } from "./client";
import { ApiError } from "./errors";

import {
  addToQueue,
  setIsRefreshing,
  getIsRefreshing,
  processQueue,
} from "./queue";

import type { RetryAxiosRequestConfig } from "./types";
import { ApiErrorResponse, ApiResponse } from "./responses";

const AUTH_ENDPOINTS = new Set([
  "api/auth/login",
  "api/auth/logout",
  "api/auth/refresh",
]);

export function setupInterceptors() {
  /**
   * Request Interceptor
   */
  apiClient.interceptors.request.use(
    (config) => {
      // Future:
      // X-Request-ID
      // X-Timezone
      // X-Locale
      return config;
    },
    (error) => Promise.reject(error),
  );

  /**
   * Response Interceptor
   */

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError<ApiErrorResponse>) => {
      /**
       * Unknown error
       */
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as
        | RetryAxiosRequestConfig
        | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const requestUrl = originalRequest.url ?? "";

      console.log(requestUrl);

      const status = error.response?.status;

      /**
       * Convert non-auth errors.
       */
      if (status !== 401) {
        return Promise.reject(
          new ApiError(
            error.response?.data?.message ?? "Something went wrong.",

            status ?? 500,

            error.response?.data?.code,
          ),
        );
      }

      /**
       * NEVER refresh authentication endpoints.
       *
       * Login 401
       * Logout 401
       * Refresh 401
       *
       * These should simply return backend message.
       */
      if (AUTH_ENDPOINTS.has(requestUrl)) {
        return Promise.reject(
          new ApiError(
            error.response?.data?.message ?? "Authentication failed.",
            status,
            error.response?.data?.code,
          ),
        );
      }

      /**
       * Already retried once.
       */
      if (originalRequest._retry) {
        return Promise.reject(new ApiError("Session expired.", 401));
      }

      /**
       * Another refresh request is already running.
       * Wait for it.
       */
      if (getIsRefreshing()) {
        return new Promise((resolve, reject) => {
          addToQueue(() => resolve(apiClient(originalRequest)), reject);
        });
      }

      originalRequest._retry = true;

      setIsRefreshing(true);

      try {
        /**
         * Refresh cookies.
         */
        await refreshClient.post<ApiResponse>("api/auth/refresh");

        /**
         * Replay queued requests.
         */

        processQueue();

        /**
         * Retry original request.
         */

        return apiClient(originalRequest);
      } catch (refreshError) {
        /**
         * Reject queued requests.
         */

        /**
         * Reject every queued request.
         */
        const sessionError = new ApiError(
          "Your session has expired. Please sign in again.",
          401,
        );

        processQueue(sessionError);

        return Promise.reject(sessionError);
      } finally {
        setIsRefreshing(false);
      }
    },
  );
}

// src/lib/auth/logout.ts

// import { queryClient } from "@/lib/react-query/client";

// export async function forceLogout() {
//   queryClient.clear();

//   window.location.href = "/login";
// }
