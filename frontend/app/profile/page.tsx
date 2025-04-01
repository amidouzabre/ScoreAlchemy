"use client"
import React, { useState } from 'react';
//import { withAuth } from "@/utils/withAuth";
import { useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateUser } from "@/utils/api"; // Import updateUser function

function Profile() {
  const { data: session } = useSession();
  const [firstname, setFirstname] = useState(session?.user?.firstname);
  const [lastname, setLastname] = useState(session?.user?.lastname);
  const [avatar, setAvatar] = useState(session?.user?.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

const handleUpdateProfile = async () => {
  try {
    const token = session?.user?.access; // Ensure token is retrieved correctly
    if (!token) {
      console.error("No token found");
      return;
    }
    console.log("token", token);
    const updateData = {
      id: session?.user?.id,
      email: session?.user?.email,
      username: session?.user?.username,
      firstname,
      lastname,
      avatar: avatarFile ? avatarFile.name : avatar, // Use file name or existing avatar URL
    };

    console.log("Profile data:", updateData);

    const updatedUser = await updateUser(token, {
      id: session?.user?.id,
      username: session?.user?.username,
      email: session?.user?.email,
      firstname: firstname || undefined,
      lastname: lastname || undefined,
      avatar: avatarFile || undefined,
    });
    console.log("Profile updated:", updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// ... existing code ...

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file)); // Preview the selected avatar
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Avatar  className="h-36 w-36">
              <AvatarImage src={avatar} alt="User Avatar" />
              <AvatarFallback>{session?.user?.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className='space-y-2'>
            <strong>Email:</strong> {session?.user?.email || ''}
          </div>
          <div className='space-y-2'>
            <strong>Username:</strong> {session?.user?.username || ''}
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar">Upload Avatar</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <Button onClick={handleUpdateProfile} className="w-full">
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;