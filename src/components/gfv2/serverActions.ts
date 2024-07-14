"use server";

import { OpenAI } from "openai";
import {
  ChatConfigParams,
  GfConfigType,
  initialPrompts,
} from "@/lib/const/gfConfig";
import { env } from "../../../zodconfig/zod";
import { Image } from "openai/resources/images.mjs";
import { initImgPrompt } from "@/lib/const/gfConfig";

export type Message = {
  role: "system" | "assistant" | "user";
  content: string;
};

export type PersonalityType = {
  role: "system";
  content: string;
};

let openai: OpenAI;
let personality: Message;
let clientMessages: Message[] = [];
let serverMessages: Message[] = [];
let images: Image[] = [];

export async function checkForActiveGirlfriend() {
  return {
    personality: personality || null,
    clientMessages: clientMessages.length > 0 ? clientMessages : null,
    serverMessages: serverMessages.length > 0 ? serverMessages : null,
    image: images.length > 0 ? images[0].url : null,
  };
}

function generateInitialPrompts(config: GfConfigType): Message {
  const content = [
    initialPrompts.introduction(config.introduction),
    initialPrompts.personalityTraits(config.traits),
    initialPrompts.physicalAppearance(config.physical),
  ].join("\n");

  return { role: "system", content } as Message;
}

function logChatMessages(
  messages: Message[],
  userMsg: string,
  aiMsg: string
): void {
  messages.push({ role: "user", content: userMsg });
  messages.push({ role: "assistant", content: aiMsg });
}
async function createGirlfriend() {
  const apiKey = env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });
  return openai;
}

export async function setupPersonalitySystemServer(
  textModel: string,
  config: GfConfigType,
  defaultParams: ChatConfigParams
): Promise<
  { initAssistantMessage: string; clientMessages: Message[] } | undefined
> {
  try {
    openai = await createGirlfriend();

    if (!openai) {
      console.error("Invalid OpenAI instance");
      return undefined;
    }

    personality = generateInitialPrompts(config);

    const completion = await openai.chat.completions.create({
      messages: [personality],
      model: textModel,
      ...defaultParams,
    });

    const initAssistantMessage = completion.choices[0].message.content;

    if (!initAssistantMessage) {
      console.error("Response failed on initial setup");
      return undefined;
    }

    clientMessages.push(personality);
    clientMessages.push({ role: "assistant", content: initAssistantMessage });

    serverMessages = [...clientMessages];

    return { initAssistantMessage, clientMessages };
  } catch (error) {
    console.error("Error setting up personality system:", error);
    return undefined;
  }
}

export async function generateChatCompletionServer(
  textModel: string,
  defaultParams: ChatConfigParams,
  msg: string
): Promise<{ chatResponse: string; clientMessages: Message[] } | undefined> {
  try {
    if (!openai) {
      console.error("Invalid OpenAI instance");
      return undefined;
    }

    const completion = await openai.chat.completions.create({
      messages: [...clientMessages, { role: "user", content: msg }],
      model: textModel,
      ...defaultParams,
    });

    const chatResponse = completion.choices[0].message.content;

    if (!chatResponse) {
      console.error("Failed chat response");
      return undefined;
    }

    logChatMessages(clientMessages, msg, chatResponse);

    serverMessages = [...clientMessages];

    return { chatResponse, clientMessages };
  } catch (error) {
    console.error("Error in chat response:", error);
    return undefined;
  }
}

export async function generateImageOfGirlfriend(
  imgModel: string,
  defaultParams: ChatConfigParams
): Promise<{ imgResponse: string } | undefined> {
  if (!openai) {
    console.error("Invalid OpenAI instance");
    return undefined;
  }

  try {
    const combinedPrompt = `${initImgPrompt}\n${serverMessages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n")}`;

    const completion = await openai.images.generate({
      prompt: combinedPrompt,
      model: imgModel,
      ...defaultParams,
    });

    const imgResponse = completion.data[0].url;

    if (!imgResponse) {
      console.error("Failed image generation response");
      return undefined;
    }

    images.push(completion.data[0]);
    console.log(images);

    return { imgResponse };
  } catch (error) {
    console.error("Error generating image:", error);
    return undefined;
  }
}
