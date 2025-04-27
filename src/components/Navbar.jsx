import React, { useState } from "react";
import { Button } from "./ui/button";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-png.png';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed right-0 left-0 top-0 z-50 bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Hamburger Button - Visible on Mobile */}

        <Link to="/">
          <img src={logo} className="w-[180px]" alt="" />
        </Link>
        {/* Logo */}

        {isSignedIn ? (
          <button
            className="lg:hidden p-2 text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        ) : (
          <Button asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        )}
      </div>

      {/* Navigation Links (Visible on Desktop, Expands on Mobile) */}
      <div
        className={`lg:flex lg:items-center lg:justify-between ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col lg:flex-row gap-4 lg:gap-6 bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none">
            {/* Home Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="text-gray-800 hover:text-blue-500"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Lessons Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/categories"
                className="text-gray-800 hover:text-blue-500"
              >
                Lessons
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Mood Quiz */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/MoodQuiz"
                className="text-gray-800 hover:text-blue-500"
              >
                Track Mood
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* About Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className="text-gray-800 hover:text-blue-500"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/videoGallery"
                className="text-gray-800 hover:text-blue-500"
              >
                Videos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/hospitalList"
                className="text-gray-800 hover:text-blue-500"
              >
                Hospital
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/progress"
                className="text-gray-800 hover:text-blue-500"
              >
                Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
