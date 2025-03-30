"use client"
import React, { useEffect, useState } from 'react';
import { withAuth } from "@/utils/withAuth";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/utils/api";
import { CurrentUser } from "@@/types";

function Profile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = session?.user?.access;
        const email = session?.user?.email || ""
        console.log("token", token);
        console.log("email", email);
      
        if (token) {
          const userData = await getCurrentUser(email, token);
          console.log("userData", userData);
          setUser(userData);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    // Implement profile update logic here
  };

  const handleResetPassword = async () => {
    // Implement password reset logic here
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          {/* Add fields for firstname, lastname, avatar */}
          <button onClick={handleUpdateProfile}>Update Profile</button>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
}

export default withAuth(Profile);

