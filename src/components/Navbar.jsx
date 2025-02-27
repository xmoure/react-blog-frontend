import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-0">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image description="img logo" src="main-logo-white.png" width={32} height={32} />
        <span>Blog</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden flex items-center h-full">
        {/* Mobile Button */}
        {!open && ( // Only show when menu is closed
          <div
            className="cursor-pointer text-4xl z-50 flex items-center"
            onClick={() => setOpen(true)}
          >
            {/* Hamburger Icon */}
            <div className="flex flex-col gap-[5.4px]">
              <div className="h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out"></div>
              <div className="h-[3px] rounded-md w-6 bg-black transition-all ease-in-out"></div>
              <div className="h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out"></div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button (X) */}
          <div
            className="absolute top-8 right-6 text-4xl cursor-pointer z-50"
            onClick={() => setOpen(false)}
          >
            ✖
          </div>

          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/write">Write</Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>
            Trending
          </Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>
            Most popular
          </Link>
          <Link to="/" onClick={() => setOpen(false)}>
            About
          </Link>

          <SignedOut>
            <Link to="/login">
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Login 👋
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/write">Write</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              {" "}
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
