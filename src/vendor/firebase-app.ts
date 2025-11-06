export type FirebaseApp = {
  readonly config: Record<string, unknown>;
};

let appInstance: FirebaseApp | null = null;

export function initializeApp(config: Record<string, unknown>): FirebaseApp {
  if (!appInstance) {
    appInstance = { config: { ...config } };
  }
  return appInstance;
}
