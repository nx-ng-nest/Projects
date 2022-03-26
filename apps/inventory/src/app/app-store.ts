export interface AppState {
  user?: { username: string; permissions: string[] };
  currentPage?: string;
}
