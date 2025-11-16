"use client";

import Image from "next/image";

export default function UserAvatar({ name, image }: { name?: string | null; image?: string | null }) {
  if (image) {
    return (
      <Image
        src={image}
        width={40}
        height={40}
        alt="Avatar"
        className="rounded-full border border-gray-300 shadow-sm"
      />
    );
  }

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-md">
      {initials}
    </div>
  );
}
