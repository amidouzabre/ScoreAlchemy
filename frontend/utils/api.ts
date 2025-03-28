// utils/api.ts

export interface SignUpData {
    email: string;
    password: string;
    //re_password: string;
  }
  
export async function signUp(data: SignUpData): Promise<{ id: number; email: string }> {
    const res = await fetch("http://localhost:8000/auth/users/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.detail || "Erreur lors de la création du compte");
    }
    return responseData;
  }
  
  
  
export async function getCurrentUser(token: string): Promise<{ id: string; email: string }> {
    const res = await fetch("http://localhost:8000/auth/users/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData.detail || "Erreur lors de la récupération des informations utilisateur");
    }
    return responseData;
  }


// Demander l'envoi de l'email de réinitialisation
export async function resetPassword(email: string): Promise<void>  {
  fetch("http://localhost:8000/auth/users/reset_password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email }) 
  })
 

};

// Confirmer le changement de mot de passe avec le token et l'uid envoyés par email
export async function resetPasswordConfirm (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
): Promise<void>  {

  const res = await fetch("http://localhost:8000/auth/users/reset_password_confirm/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ uid, token, new_password, re_new_password })
  })
  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.detail || "Erreur lors de la récupération des informations utilisateur");
  }
  return responseData;
};

  
