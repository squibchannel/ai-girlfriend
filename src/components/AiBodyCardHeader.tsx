import React from "react";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import ThemeToggle from "./ThemeToggle";

function AiBodyCardHeader() {
  return (
    <CardHeader className="flex flex-row items-center w-full">
      <ThemeToggle />
      <CardTitle className="mx-auto">Ai Girlfriend</CardTitle>
    </CardHeader>
  );
}

export default AiBodyCardHeader;
