import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import HeroButton from "./HeroButton";

export default function MainHero() {
  return (
    <Card className="overflow-hidden py-6 lg:py-12 mt-8 mb-8 flex flex-col items-center max-w-[90%]">
      <CardHeader>
        <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          AI GIRLFRIEND
        </CardTitle>
        <CardDescription className="mt-3 text-xl text-muted-foreground">
          Using openai's text completion to help stop loneliness.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5 max-w-5xl mx-auto">
        <Image
          src="/frieren_test_bkg.jpeg"
          className="rounded-xl"
          alt="Image Description"
          width={1024}
          height={480}
          priority={true}
        />
      </CardContent>
      <CardFooter className="mt-4">
        <HeroButton />
      </CardFooter>
    </Card>
  );
}
