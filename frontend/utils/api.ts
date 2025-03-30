// utils/api.ts
// --- Types and Interfaces ---
import { SignUpData, User, CurrentUser } from "@@/types";
export interface ApiErrorData {
  username?: string[];
  email?: string[];
  password?: string[];
  token?: string[];
  new_password?: string[];
  uid?: string[];
  non_field_errors?: string[];
  [key: string]: string[] | undefined;
}



// --- Helper Function ---

const BASE_URL = "http://localhost:8000/auth/users";

async function apiCall<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw { error: data } as T;
    // Throwing error ensures that all functions report errors in the same way.
    //throw new Error(data || "An error occurred while processing your request.");
  }
  return data;
}

// --- API Functions ---

/**
 * Sign up a new user.
 * @param data - User data for signup.
 * @returns A promise resolving with user details.
 */
export async function signUp(data: SignUpData): Promise<User> {
  return await apiCall<User>(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Get the current user's details.
 * @param token - The authentication token.
 * @returns A promise resolving with the current user's details.
 */
export async function getCurrentUser(email:string, token: string): Promise<CurrentUser> {
  return await apiCall<CurrentUser>(`${BASE_URL}/me/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
}

/**
 * Request a password reset email.
 * @param email - The email address of the user.
 */
export async function resetPassword(email: string): Promise<void> {
  await apiCall<void>(`${BASE_URL}/reset_password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

/**
 * Confirm the password reset with new credentials.
 * @param new_password - The new password.
 * @param re_new_password - Confirmation of the new password.
 * @param token - The password reset token.
 * @param uid - The user's unique identifier.
 */
export async function resetPasswordConfirm(
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
): Promise<void> {
  await apiCall<void>(`${BASE_URL}/reset_password_confirm/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, token, new_password, re_new_password }),
  });
}
