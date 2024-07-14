"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import GitHubIcon from "@mui/icons-material/GitHub";
import ThemeToggle from "./ThemeToggle";
import PublicIcon from "@mui/icons-material/Public";
import SavingsIcon from "@mui/icons-material/Savings";

export function Navbar() {
  return (
    <NavigationMenu className="mt-2 min-w-full flex justify-between items-center left-2">
      <NavigationMenuList className="flex items-center">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="mb-2">
            <PublicIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className=" z-50 grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[1fr_1fr] ">
              <li className="row-span-1 col-span-2 max-w-[50%] place-self-center">
                <NavigationMenuLink asChild>
                  <a
                    className="flex justify-center h-full w-full select-none flex-col  rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src="/hyppnoootooad.gif"
                      alt="pepe"
                      width={150}
                      height={150}
                      className="self-center"
                    />
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-1 col-span-2 items-center justify-center text-center">
                <ListItem title="squib_channel">
                  Hi, I'm squib. I made this. I hope you enjoy!
                </ListItem>
              </li>
              <ListItem
                href="https://www.twitch.tv/squib_channel"
                title="twitch"
                className="flex flex-row items-center justify-around"
                target="_blank"
              >
                <SocialIcon network="twitch" />
              </ListItem>

              <ListItem
                href="https://www.tiktok.com/@squib_channel"
                title="tiktok"
                className="flex flex-row items-center justify-around"
                target="_blank"
              >
                <SocialIcon network="tiktok" />
              </ListItem>
              <ListItem
                href="https://www.youtube.com/@squib-channel"
                title="youtube"
                className="flex flex-row items-center justify-around"
                target="_blank"
              >
                <SocialIcon network="youtube" />
              </ListItem>
              <ListItem
                href="https://x.com/Squibchannel"
                title="twitter"
                className="flex flex-row items-center justify-around"
                target="_blank"
              >
                <SocialIcon network="twitter" />
              </ListItem>
              {/* <li className=" row-span-1 col-span-2 w-full text-center"> */}
              <ListItem
                href="https://www.paypal.com/paypalme/squibchannel"
                title="donate"
                target="_blank"
                className="flex flex-row items-center justify-center"
              >
                <SavingsIcon className="ml-2" />
              </ListItem>
              <ListItem
                href="https://github.com/squibchannel/ai-girlfriend"
                title="github"
                target="_blank"
                className="flex flex-row items-center justify-center"
              >
                <GitHubIcon className="ml-2" />
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuItem className="list-none mr-7 mb-4">
        <ThemeToggle />
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
