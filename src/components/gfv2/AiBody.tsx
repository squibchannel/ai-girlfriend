"use client";

import openai from "openai";
import React, { useEffect, useState } from "react";
import { ChatConfigParams, GfConfigType } from "../../lib/const/gfConfig"; // Adjust the import path as needed
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import {
  checkForActiveGirlfriend,
  generateChatCompletionServer,
  generateImageOfGirlfriend,
  Message,
  setupPersonalitySystemServer,
} from "./serverActions";
import Image from "next/image";
import { testParamsForAlice, aliceConfigTestData } from "@/lib/const/testData";
import TestComponent from "@/lib/const/TestComponent";
import Pepe from "@/lib/const/Pepe";
import MainHero from "../MainHero";
import GfConfigForm from "../GfConfigForm";

const AiBody: React.FC = () => {
  const [systemSettings, setSystemSettings] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [gfImg, setGfImg] = useState<string | undefined>(undefined);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textModel, setTextModel] = useState<string>("gpt-3.5-turbo");
  const [imgModel, setImgModel] = useState<string>("dall-e-3");
  const [defaultParams, setDefaultParams] =
    useState<ChatConfigParams>(testParamsForAlice);
  const [gfConfig, setGfConfig] = useState<GfConfigType>(aliceConfigTestData);

  useEffect(() => {
    const whereIsMyGf = async () => {
      try {
        const status = await checkForActiveGirlfriend();
        console.log(status);

        if (!status) {
          console.log("No gf yet ;)");
          return;
        }

        const { personality, clientMessages, image } = status;

        const handleMessages = (clientMessages: Message[]) => {
          const msgs = clientMessages.filter((_, i) => i !== 0);
          setMessages(msgs);
        };

        !personality ? null : setSystemSettings(personality);
        !clientMessages ? null : handleMessages(clientMessages);
        !image ? null : setGfImg(image);
      } catch (error) {
        console.log("No girlfriend");
        return;
      }
    };
    whereIsMyGf();
  }, []);

  const initializeOpenAI = async () => {
    const setupResponse = await setupPersonalitySystemServer(
      textModel,
      gfConfig,
      defaultParams
    );

    if (!setupResponse) {
      console.error("Failed to retrieve the initial setup response");
      return;
    }

    const prompt = setupResponse.clientMessages[0];
    const removePrompt = setupResponse.clientMessages.filter((_, i) => i !== 0);
    setLoading(true);

    setMessages(removePrompt);
    setSystemSettings(prompt);

    const image = await generateImageOfGirlfriend(imgModel, defaultParams);

    if (!image) {
      console.error("Image failed to generate");
      setLoading(false);
      setError("Image failed to generate");
      return;
    }
    setGfImg(image.imgResponse);
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      if (!openai) {
        setError("OpenAI instance not initialized.");
        setLoading(false);
        return;
      }

      const response = await generateChatCompletionServer(
        textModel,
        defaultParams,
        input
      );

      if (response) {
        setMessages([
          ...messages,
          { role: "user", content: input },
          { role: "assistant", content: response.chatResponse },
        ]);
        setInput("");
      } else {
        setError("Failed to get a response from the server.");
      }
    } catch (err) {
      setError("An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {systemSettings && (
        <Card className="max-h-fit max-w-[90vw]">
          {/* <Pepe /> */}
          {gfImg && (
            <Card className="border-none p-4 flex items-center justify-center w-full">
              <Image
                priority={true}
                src={gfImg}
                alt="gf-img"
                height={512}
                width={512}
              />
            </Card>
          )}
          <Card className="border-none flex flex-col p-4 mt-4 w-[90vw] mb-8 items-center max-h-[45vh] overflow-scroll overflow-x-hidden">
            {gfImg ? (
              <>
                <CardContent className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <Card key={index} className="p-4">
                      <strong>{message.role}:</strong> {message.content}
                    </Card>
                  ))}
                </CardContent>
              </>
            ) : null}

            {/* <TestComponent gfImg={""} messages={[]} /> */}

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          </Card>
          <Card className="border-none items-center flex flex-row justify-center pb-4">
            {systemSettings && !loading && (
              <CardFooter className="flex flex-row gap-4 mt-4 max-w-[80vw]">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />

                <Button onClick={handleSendMessage} disabled={loading}>
                  Send
                </Button>
              </CardFooter>
            )}
          </Card>
        </Card>
      )}
      {!systemSettings && (
        <>
          <GfConfigForm />
          <Button
            onClick={async () => await initializeOpenAI()}
            disabled={loading}
            className="min-w-[25vw] justify-center items-center mt-8"
          >
            Synthesize
          </Button>
        </>
      )}
    </>
  );
};

export default AiBody;
