"use client";

import { useState } from "react";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { FaHamburger } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <ChefHat className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">MealWell</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Testimonials
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="ml-auto sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaHamburger className={"h-6 w-6"} />
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="flex flex-col items-center sm:hidden bg-white border-b">
          <Link className="text-sm font-medium py-2 hover:underline" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium py-2 hover:underline" href="#">
            How It Works
          </Link>
          <Link className="text-sm font-medium py-2 hover:underline" href="#">
            Testimonials
          </Link>
        </nav>
      )}
    </>
  );
}
