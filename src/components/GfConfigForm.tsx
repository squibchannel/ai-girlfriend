"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { gfFormSchema } from "@/lib/zSchemas/gfFormSchema";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";

type FormValues = z.infer<typeof gfFormSchema>;

const defaultValues: FormValues = {
  textModel: "gpt-3.5-turbo",
  imgModel: "dall-e-3",
  defaultParams: {
    stop: undefined,
    temperature: undefined,
    max_tokens: undefined,
    presence_penalty: undefined,
    frequency_penalty: undefined,
    top_p: undefined,
    logit_bias: undefined,
  },
  gfConfig: {
    introduction: {
      aiName: "",
      username: "",
    },
    traits: [],
    physical: {
      hair: "",
      body: "",
      eyes: "",
      age: 0,
    },
  },
};

const textModelOptions = ["gpt-3.5-turbo", "gpt-4"];
const imgModelOptions = ["dall-e-3", "dall-e-2"];

const GfConfigForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(gfFormSchema),
    defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-12  grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 "
      >
        {/* Text and Image Models Section */}
        <Card className="space-y-4 p-4">
          <FormField
            control={form.control}
            name="textModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text Model</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a text model" />
                    </SelectTrigger>
                    <SelectContent>
                      {textModelOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select the text model</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Model</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an image model" />
                    </SelectTrigger>
                    <SelectContent>
                      {imgModelOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select the image model</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Username and AI Name Section */}
        <Card className="space-y-4 p-4">
          <FormField
            control={form.control}
            name="gfConfig.introduction.username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>Enter your username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gfConfig.introduction.aiName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter AI name" {...field} />
                </FormControl>
                <FormDescription>Enter the AI's name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Default Parameters Section */}
        <Card className="space-y-4 p-4 grid grid-cols-2 gap-x-6 items-baseline">
          <FormField
            control={form.control}
            name="defaultParams.stop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stop</FormLabel>
                <FormControl>
                  <Input placeholder="Enter stop" {...field} />
                </FormControl>
                <FormDescription>Stop description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultParams.temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter temperature"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Temperature description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultParams.max_tokens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Tokens</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter max tokens"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Max tokens description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultParams.presence_penalty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presence Penalty</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter presence penalty"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Presence penalty description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultParams.frequency_penalty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency Penalty</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter frequency penalty"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Frequency penalty description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultParams.top_p"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Top P</FormLabel>
                <FormControl>
                  <Input placeholder="Enter top P" type="number" {...field} />
                </FormControl>
                <FormDescription>Top P description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultParams.logit_bias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logit Bias</FormLabel>
                <FormControl>
                  <Input placeholder="Enter logit bias" {...field} />
                </FormControl>
                <FormDescription>Logit bias description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* GF Config Section */}
        <Card className="space-y-4 p-4 grid grid-cols-2 gap-x-6 items-baseline">
          <FormField
            control={form.control}
            name="gfConfig.traits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Traits</FormLabel>
                <FormControl>
                  <Input placeholder="Enter traits" {...field} />
                </FormControl>
                <FormDescription>Enter traits</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gfConfig.physical.hair"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hair</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hair description" {...field} />
                </FormControl>
                <FormDescription>Enter hair description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gfConfig.physical.body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Input placeholder="Enter body description" {...field} />
                </FormControl>
                <FormDescription>Enter body description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gfConfig.physical.eyes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eyes</FormLabel>
                <FormControl>
                  <Input placeholder="Enter eye description" {...field} />
                </FormControl>
                <FormDescription>Enter eye description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gfConfig.physical.age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Enter age" type="number" {...field} />
                </FormControl>
                <FormDescription>Enter age</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        {/* Submit Button */}
        {/* <Button type="submit" className="col-span-2">
          Submit
        </Button> */}
      </form>
    </Form>
  );
};

export default GfConfigForm;
