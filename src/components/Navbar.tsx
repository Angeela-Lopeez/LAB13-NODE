"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-black shadow-sm">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-white">
          MyAuthApp
        </Link>

        <ul className="flex items-center gap-6 text-sm text-white">

          {/* Siempre visible */}
          <li>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </li>

          {/* Solo si hay sesión */}
          {session?.user && (
            <>
              <li>
                <Link href="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </li>

              <li>
                <LogoutButton />
              </li>

              <li>
                <UserAvatar name={session.user.name} image={session.user.image} />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
