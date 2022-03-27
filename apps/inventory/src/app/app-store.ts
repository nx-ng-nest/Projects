export interface AppState {
  user?: { username: string; permissions: string[] };
  currentPage?: string;
}

export interface AppUpState {
  app: AppState;
}
