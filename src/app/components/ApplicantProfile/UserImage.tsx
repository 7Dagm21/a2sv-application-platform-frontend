// userImage.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

interface UserData {
  name: string;
  email: string;
}

interface UserInfoProps {
  user?: UserData;
}

export default function UserImage({ user }: UserInfoProps) {
  const [userData] = useState<UserData>(
    user
      ? { name: user.name, email: user.email }
      : { name: "Abebe Kebede", email: "abe@a2sv.org" }
  );

  return (
    <div className="relative h-64 mx-63 my-10 auto">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Image
          src="/images/profile_background.jpg"
          alt="Profile background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-6 text-white">
        <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <Image
            src="/images/profile_owner.jpg"
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="ml-40">
        <h1 className="text-2xl font-bold">{userData.name}</h1>
        <p className="text-gray-200">{userData.email}</p>
      </div>
    </div>
  );
}
