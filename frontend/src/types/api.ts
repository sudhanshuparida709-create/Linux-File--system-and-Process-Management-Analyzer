/* =====================================
   API HTTP Methods
===================================== */

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

/* =====================================
   API Response Types
===================================== */

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
  details?: unknown;
}

export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

/* =====================================
   API Request Types
===================================== */

export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<
    string,
    string | number | boolean | undefined
  >;
  body?: unknown;
  signal?: AbortSignal;
  timeout?: number;
}

/* =====================================
   API Error Types
===================================== */

export interface ApiErrorDetails {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface ApiValidationError {
  field: string;
  message: string;
}

export interface ApiValidationErrorResponse
  extends ApiErrorResponse {
  validationErrors?: ApiValidationError[];
}

/* =====================================
   Pagination Types
===================================== */

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

/* =====================================
   Sorting Types
===================================== */

export type SortDirection = "asc" | "desc";

export interface SortParams {
  sortBy?: string;
  sortOrder?: SortDirection;
}

/* =====================================
   File Upload Types
===================================== */

export interface FileUploadResponse {
  success: boolean;
  message?: string;
  fileName: string;
  filePath: string;
  size: number;
}

/* =====================================
   API Status Types
===================================== */

export type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: ApiStatus;
}

/* =====================================
   Server Health Types
===================================== */

export interface ServerHealthResponse {
  status: "online" | "offline" | "degraded";
  uptime?: number;
  timestamp?: string;
  version?: string;
}