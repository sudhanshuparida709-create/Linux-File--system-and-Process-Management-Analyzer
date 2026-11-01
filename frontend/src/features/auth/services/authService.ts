import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth.types";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
).replace(/\/+$/, "");

async function authRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<AuthResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/auth${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check whether the backend is running."
    );
  }

  const result = (await response.json().catch(() => null)) as
    | AuthResponse
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(
      result?.message || "Authentication request failed."
    );
  }

  return result;
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthUser> {
  const result = await authRequest("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!result.data?.user) {
    throw new Error("The server did not return user information.");
  }

  return result.data.user;
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<AuthUser> {
  const result = await authRequest("/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!result.data?.user) {
    throw new Error("The server did not return user information.");
  }

  return result.data.user;
}

export async function logoutUser(): Promise<void> {
  await authRequest("/logout", {
    method: "POST",
  });
}

export async function getCurrentUser(): Promise<AuthUser> {
  const result = await authRequest("/me", {
    method: "GET",
  });

  if (!result.data?.user) {
    throw new Error("Unable to retrieve the current user.");
  }

  return result.data.user;
}