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
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
         {/* Hamburger Button - Visible on Mobile */}
         {/* <button
          className="lg:hidden p-2 text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button> */}
        <Link to='/'><img src={logo} className="w-[180px]" alt="" /></Link>
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-800">
          {/* <Button>Sign in</Button> */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" appearance={{
              elements: { avatarBox: "w-9 h-9" } // Increased size
            }} /> // Shows Gmail Avatar
          ) : (
            <Button asChild>
             <Link to='/login'>Sign in</Link>
            </Button>
          )}
        </a>
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
                href="/lessons"
                className="text-gray-800 hover:text-blue-500"
              >
                Lessons
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
            {/* Contact Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                className="text-gray-800 hover:text-blue-500"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
