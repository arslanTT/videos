// "use client";

// import Link from "next/link";
// import { useSession, signIn, signOut } from "next-auth/react";

// export default function Navbar() {
//   const { data: session } = useSession();

//   return (
//     <nav className="w-full bg-gray-900 text-white shadow">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo / Name */}
//         <Link
//           href="/"
//           className="text-xl font-bold hover:text-blue-400 transition"
//         >
//           ClipStream
//         </Link>

//         {/* Nav Links */}
//         <div className="flex items-center gap-4">
//           {session && (
//             <Link href="/upload" className="hover:text-blue-400 transition">
//               Upload
//             </Link>
//           )}

//           {!session ? (
//             <button
//               onClick={() => signIn()}
//               className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={() => signOut()}
//               className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Upload, LogIn, LogOut, User } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
}

export default function VideosNavbar({
  isLoggedIn = false,
  username,
}: NavbarProps) {
  return (
    <nav className="w-full bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">AI Shorts</span>
        </Link>

        {/* Middle: Search */}
        <div className="hidden sm:flex w-1/3">
          <Input
            type="text"
            placeholder="Search videos..."
            className="w-full"
          />
        </div>

        {/* Right side: Auth / Upload */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="hidden sm:inline text-muted-foreground text-sm">
                {username ? `Hi, ${username}` : ""}
              </span>
              <Link href="/upload">
                <Button variant="outline" size="sm" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-1">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm" className="gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="sm" className="gap-1 sm:hidden">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
