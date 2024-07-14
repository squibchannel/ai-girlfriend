"use client";

import { Button } from "./ui/button";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import Link from "next/link";

const HeroButton = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState("Create My AI Girlfriend");

  const scramble = () => {
    const TARGET_TEXT = "Create My AI Girlfriend";
    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 50;
    const CHARS = "!@#$%^&*():{};|,.<>/?";

    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText("Create My AI Girlfriend");
  };

  return (
    <Link href="/aichat">
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="relative overflow-hidden font-extrabold text-lg p-6 transition duration-300 ease-in-out bg-gradient-to-r from-pink-400 to-purple-400 hover:from-purple-400 hover:to-pink-400 hover:text-white rounded-md"
      >
        <div className="flex items-center gap-2">
          {/* <FiLock /> */}
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </motion.button>
    </Link>
  );
};

export default HeroButton;
