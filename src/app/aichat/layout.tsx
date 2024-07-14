import AiBodyCardHeader from "@/components/AiBodyCardHeader";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ChatLayout({ children }: Props) {
  return (
    <main>
      <AiBodyCardHeader />
      {children}
    </main>
  );
}
