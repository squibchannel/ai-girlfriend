import { ChatConfigParams, GfConfigType } from "./gfConfig";

export const testMessages = [
  {
    role: "system",
    content: "Welcome to your AI assistant. How can I help you today?",
  },
  { role: "user", content: "How's the weather today?" },
  {
    role: "assistant",
    content: "The weather today is sunny with a high of 75°F.",
  },
  { role: "user", content: "Great! Can you remind me to call my mom later?" },
  {
    role: "assistant",
    content: "Sure, I'll remind you to call your mom at 6 PM.",
  },
  {
    role: "system",
    content: "Welcome to your AI assistant. How can I help you today?",
  },
  { role: "user", content: "How's the weather today?" },
  {
    role: "assistant",
    content: "The weather today is sunny with a high of 75°F.",
  },
  { role: "user", content: "Great! Can you remind me to call my mom later?" },
  {
    role: "assistant",
    content: "Sure, I'll remind you to call your mom at 6 PM.",
  },
  {
    role: "system",
    content: "Welcome to your AI assistant. How can I help you today?",
  },
  { role: "user", content: "How's the weather today?" },
  {
    role: "assistant",
    content: "The weather today is sunny with a high of 75°F.",
  },
  { role: "user", content: "Great! Can you remind me to call my mom later?" },
  {
    role: "assistant",
    content: "Sure, I'll remind you to call your mom at 6 PM.",
  },
  {
    role: "system",
    content: "Welcome to your AI assistant. How can I help you today?",
  },
  { role: "user", content: "How's the weather today?" },
  {
    role: "assistant",
    content: "The weather today is sunny with a high of 75°F.",
  },
  { role: "user", content: "Great! Can you remind me to call my mom later?" },
  {
    role: "assistant",
    content: "Sure, I'll remind you to call your mom at 6 PM.",
  },
];

export const testParamsForAlice: ChatConfigParams = {
  temperature: undefined,
  max_tokens: undefined,
  presence_penalty: undefined,
  frequency_penalty: undefined,
  top_p: undefined,
  stop: undefined,
  logit_bias: undefined,
};

export const aliceConfigTestData: GfConfigType = {
  introduction: {
    aiName: "Alice",
    username: "Squib",
  },
  traits: ["funny", "quirky", "coy", "warm-hearted"],
  physical: {
    hair: "blue",
    body: "medium sized, pale skin",
    eyes: "brown",
    age: 30,
  },
};

import React from "react";
import Image from "next/image";

interface Message {
  role: string;
  content: string;
}

interface TestComponentProps {
  gfImg: string;
  messages: Message[];
}
