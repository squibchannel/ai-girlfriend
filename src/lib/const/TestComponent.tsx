import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Message } from "@/components/gfv2/serverActions";
import { testMessages } from "./testData";

interface TestComponentProps {
  gfImg: string;
  messages: Message[];
}

interface TestMessage {
  role: string;
  content: string;
}

const TestComponent: React.FC<TestComponentProps> = () => {
  return (
    <Card className="p-4 pt-8 min-w-[90%]">
      <CardContent className="flex flex-col gap-4">
        {testMessages.map((message: TestMessage, index: number) => (
          <Card key={index} className="card p-4">
            <strong>{message.role}:</strong> {message.content}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default TestComponent;
