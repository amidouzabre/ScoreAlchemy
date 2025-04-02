// utils/api.ts
// --- Types and Interfaces ---
import { SignUpData, User } from "@@/types";
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

const BASE_URL = "http://localhost:8000";

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
  return await apiCall<User>(`${BASE_URL}/auth/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}



/**
 * Request a password reset email.
 * @param email - The email address of the user.
 */
export async function resetPassword(email: string): Promise<void> {
  await apiCall<void>(`${BASE_URL}/auth/users/reset_password/`, {
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
  await apiCall<void>(`${BASE_URL}/auth/users/reset_password_confirm/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, token, new_password, re_new_password }),
  });
}




export async function updateUser(
  token: string,
  data: {
    id: string;
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    avatar?: File;
    password?: string;
    new_password?:string
  }
): Promise<User> {
  const formData = new FormData();
  formData.append('id', data.id);
  if (data.username) formData.append('username', data.username);
  if (data.email) formData.append('email', data.email);
  if (data.firstname) formData.append('firstname', data.firstname);
  if (data.lastname) formData.append('lastname', data.lastname);
  if (data.avatar) formData.append('avatar', data.avatar);
  if (data.password) formData.append('password', data.password);
  if (data.new_password) formData.append('new_password', data.new_password);

  return await apiCall<User>(`${BASE_URL}/profile/update/`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
}

/**
 * 
 * @param { string } token
 * @returns {User} user
 */
export async function getCurrentUser(token: string): Promise<User> {
  return await apiCall<User>(`${BASE_URL}/profile/update/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}