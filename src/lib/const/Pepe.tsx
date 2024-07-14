import { CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

function Pepe() {
  return (
    <CardHeader className="border-none flex items-center justify-center w-full">
      <Image src="/pepe.jpg" alt="pepe-img" height={512} width={512} />
    </CardHeader>
  );
}

export default Pepe;
