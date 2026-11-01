const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? ""
).replace(/\/+$/, "");

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type QueryParams = Record<
  string,
  QueryValue | readonly QueryValue[]
>;

export interface ApiRequestOptions
  extends Omit<RequestInit, "body"> {
  params?: QueryParams;
  body?: unknown;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function buildUrl(
  path: string,
  params?: QueryParams,
): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const url = `${API_BASE_URL}${normalizedPath}`;

  if (!params) {
    return url;
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item));
        }
      });

      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();

  return queryString
    ? `${url}${url.includes("?") ? "&" : "?"}${queryString}`
    : url;
}

function prepareBody(
  body: unknown,
  headers: Headers,
): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (
    typeof body === "string" ||
    (typeof FormData !== "undefined" && body instanceof FormData) ||
    (typeof Blob !== "undefined" && body instanceof Blob) ||
    body instanceof ArrayBuffer ||
    (typeof URLSearchParams !== "undefined" &&
      body instanceof URLSearchParams)
  ) {
    return body as BodyInit;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType =
    response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  const text = await response.text();

  return text as T;
}

function getErrorMessage(
  data: unknown,
  statusText: string,
): string {
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data && typeof data === "object") {
    const errorData = data as Record<string, unknown>;

    if (typeof errorData.message === "string") {
      return errorData.message;
    }

    if (typeof errorData.error === "string") {
      return errorData.error;
    }
  }

  return statusText || "An API request failed.";
}

async function request<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    params,
    body,
    headers: customHeaders,
    ...requestOptions
  } = options;

  const headers = new Headers(customHeaders);

  headers.set(
    "Accept",
    headers.get("Accept") ?? "application/json",
  );

  const requestBody = prepareBody(body, headers);

  const response = await fetch(buildUrl(path, params), {
    ...requestOptions,
    headers,
    body: requestBody,
    credentials: requestOptions.credentials ?? "same-origin",
  });

  const result = await parseResponse<unknown>(response);

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(result, response.statusText),
      response.status,
      result,
    );
  }

  return result as T;
}

export const apiClient = {
  request,

  get<T>(
    path: string,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ): Promise<T> {
    return request<T>(path, {
      ...options,
      method: "GET",
    });
  },

  post<T>(
    path: string,
    body?: unknown,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ): Promise<T> {
    return request<T>(path, {
      ...options,
      method: "POST",
      body,
    });
  },

  put<T>(
    path: string,
    body?: unknown,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ): Promise<T> {
    return request<T>(path, {
      ...options,
      method: "PUT",
      body,
    });
  },

  patch<T>(
    path: string,
    body?: unknown,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ): Promise<T> {
    return request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    });
  },

  delete<T>(
    path: string,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ): Promise<T> {
    return request<T>(path, {
      ...options,
      method: "DELETE",
    });
  },
};

export default apiClient;