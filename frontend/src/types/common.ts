import type { ReactNode } from "react";

/* =====================================
   General Utility Types
===================================== */

export type ID = string | number;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Dictionary<T = unknown> = Record<string, T>;

export type ValueOf<T> = T[keyof T];

/* =====================================
   Theme Types
===================================== */

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeSettings {
  theme: ThemeMode;
  accentColor?: string;
}

/* =====================================
   Status Types
===================================== */

export type StatusType =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "pending"
  | "active"
  | "inactive";

export type LoadingState =
  | "idle"
  | "loading"
  | "success"
  | "error";

/* =====================================
   Option and Select Types
===================================== */

export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
}

/* =====================================
   Pagination Types
===================================== */

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/* =====================================
   Sorting Types
===================================== */

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  key: string;
  direction: SortOrder;
}

/* =====================================
   Search Types
===================================== */

export interface SearchConfig {
  query: string;
  placeholder?: string;
  debounce?: number;
}

/* =====================================
   Breadcrumb Types
===================================== */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

/* =====================================
   Navigation Types
===================================== */

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  description?: string;
  badge?: string;
  children?: NavigationLink[];
}

/* =====================================
   Date Range Types
===================================== */

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

/* =====================================
   Key Value Types
===================================== */

export interface KeyValueItem {
  label: string;
  value: string | number | ReactNode;
  description?: string;
}

/* =====================================
   Table Types
===================================== */

export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  width?: string | number;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
}

/* =====================================
   Modal Types
===================================== */

export type ModalSize =
  | "small"
  | "medium"
  | "large"
  | "fullscreen";

export interface ModalConfig {
  isOpen: boolean;
  title?: string;
  description?: string;
  size?: ModalSize;
}

/* =====================================
   Notification Types
===================================== */

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface Notification {
  id: ID;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  timestamp?: string;
}

/* =====================================
   User Types
===================================== */

export interface UserInfo {
  id: ID;
  name: string;
  email?: string;
  username?: string;
  avatar?: string;
  role?: string;
}

/* =====================================
   Component State Types
===================================== */

export interface ComponentState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

/* =====================================
   Event Handler Types
===================================== */

export type ChangeHandler<T> = (value: T) => void;

export type ClickHandler = () => void;

export type SubmitHandler<T = void> = (
  data: T,
) => void | Promise<void>;

/* =====================================
   Generic Component Props
===================================== */

export interface ChildrenProps {
  children: ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface BaseComponentProps
  extends ChildrenProps,
    ClassNameProps {
  id?: string;
}