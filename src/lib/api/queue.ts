let isRefreshing = false;

let failedQueue: {
  resolve: () => void;
  reject: (error: unknown) => void;
}[] = [];

export function getIsRefreshing() {
  return isRefreshing;
}

export function setIsRefreshing(value: boolean) {
  isRefreshing = value;
}

export function addToQueue(
  resolve: () => void,
  reject: (error: unknown) => void,
) {
  failedQueue.push({
    resolve,
    reject,
  });
}

export function processQueue(error?: unknown) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
}
