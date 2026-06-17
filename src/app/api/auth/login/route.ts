import { handleApiError } from "@/lib/http/handle-api-error";
import { successResponse } from "@/lib/http/success-response";
import { validate } from "@/lib/validation/validation";
import { loginService } from "@/modules/auth/services/login.service";
import { setAuthCookies } from "@/modules/auth/utils/cookies";
import {
  LoginInput,
  loginSchema,
} from "@/modules/auth/validators/login.schema";

export async function POST(request: Request) {
  try {
    const loginData: LoginInput = validate(loginSchema, await request.json());

    const loginResult = await loginService(loginData);

    const response = successResponse({
      message: "Login successful",
      data: {
        user: loginResult.user,
      },
      statusCode: 200,
    });

    setAuthCookies(response, loginResult.accessToken, loginResult.refreshToken);

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
