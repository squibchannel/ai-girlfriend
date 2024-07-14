import AiBodyCardHeader from "@/components/AiBodyCardHeader";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ChatLayout({ children }: Props) {
  return (
    <main className="place-content-center flex flex-col items-center">
      {children}
    </main>
  );
}
