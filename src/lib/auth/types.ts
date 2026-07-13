export type UserSession = {
  email: string;
  name: string;
  initials: string;
};

export type AuthStatus = "idle" | "loading" | "success" | "error";
