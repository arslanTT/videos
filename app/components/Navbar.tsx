"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  Menu,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
interface Props {
  isDashboard?: boolean;
}
export default function Navbar({ isDashboard = false }: Props) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session;
  const username = session?.user?.name || session?.user?.email?.split("@")[0];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <nav className="w-full bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/videos"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Image
              src={"/download.svg"}
              alt={"logo"}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
          <span className="font-bold text-xl text-foreground">UpView</span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
          ) : !isLoggedIn ? (
            <Button
              onClick={handleSignIn}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-muted-foreground text-sm">
                  Hi, {username}
                </span>

                {isDashboard ? (
                  <Link href="/upload">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                )}

                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>

              {/* Mobile View - Dropdown Menu */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled className="font-medium">
                      <User className="h-4 w-4 mr-2" />
                      {username}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="w-full">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
