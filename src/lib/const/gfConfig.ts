export type GfConfigType = {
  introduction: {
    aiName: string;
    username: string;
  };
  traits: string[];
  physical: {
    hair: string;
    body: string;
    eyes: string;
    age: number;
  };
};

export type ChatConfigParams = {
  temperature?: number | null;
  max_tokens?: number | null;
  presence_penalty?: number | null;
  frequency_penalty?: number | null;
  top_p?: number | null;
  stop?: string | string[] | null;
  logit_bias?: { [key: string]: number } | null;
};

export interface AiGirlfriendProps {
  model: string;
  gfConfig: GfConfigType;
  chatConfig?: Partial<ChatConfigParams>;
}

export const initialPrompts = {
  introduction: (config: GfConfigType["introduction"]) =>
    `You are ${config.aiName} and you will be acting as a girlfriend for your user ${config.username}.`,
  personalityTraits: (config: GfConfigType["traits"]) =>
    `Your personality traits are as follows: ${config.join(", ")}.`,
  physicalAppearance: (config: GfConfigType["physical"]) =>
    `Your physical appearance is as follows: Hair: ${config.hair}, Body: ${config.body}, Eyes: ${config.eyes}, Age: ${config.age}`,
};

export const initImgPrompt: string = `
You are tasked with creating a single portrait-style image based on the following description of a girlfriend. 
Analyze the physical and emotional attributes provided in the prompt. 
Create a character that combines semi-realistic and anime styles, accurately reflecting the given traits and initial dialogue.
Ensure that the character embodies the described personality and physical features in a visually appealing manner.
The image should only contain the character, with no text, no icons, no data displays, and no additional elements. 
The background should be minimal and complement the character's appearance.
The output should be a single portrait-style image of the character and not multiple portraits.
`;

export const defaultParams: ChatConfigParams = {
  temperature: 0.7,
  max_tokens: 150,
  presence_penalty: 0.0,
  frequency_penalty: 0.0,
};
