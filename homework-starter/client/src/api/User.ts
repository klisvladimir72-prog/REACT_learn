import z from "zod";
import { validateResponse } from "./validateResponse";

export const API_BASE_URL = "http://localhost:4000";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export function registerUser(
  username: string,
  email: string,
  password: string
): Promise<{ id: string }> {
  return fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => z.object({ id: z.string() }).parse(data));
}

export function loginUser(email: string, password: string): Promise<AuthResponse> {
  return fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => AuthResponseSchema.parse(data));
}

export function fetchMe(): Promise<User> {
  return fetch(`${API_BASE_URL}/users/me`, { credentials: "include" })
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function logout(): Promise<void> {
  return fetch(`${API_BASE_URL}logout`)
    .then(validateResponse)
    .then(() => undefined);
}
