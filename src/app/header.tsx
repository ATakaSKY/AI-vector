"use client";

import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

const Header = () => {
  return (
    <div className=" bg-slate-800  py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 text-2xl">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            className="rounded"
            alt="an image of a brain"
          />
          AI-DOC
        </div>
        <div className="flex gap-2">
          <ModeToggle />

          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
