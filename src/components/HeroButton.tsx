import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function HeroButton() {
  return (
    <Button className="font-extrabold text-lg p-6">
      <Link className="pl-4 pr-4" href="/aichat">
        Create My Ai Girlfriend
      </Link>
    </Button>
  );
}

export default HeroButton;
