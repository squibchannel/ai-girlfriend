import { toast } from "sonner";

export function convertBase64JsonString(base64JsonString: string) {
  try {
    const jsonText = atob(base64JsonString);
    const jsonData = JSON.parse(jsonText);

    return jsonData;
  } catch (error) {
    toast.error("Error decoding or parsing JSON data.");
    console.error("Error decoding or parsing JSON:", error);
    return null;
  }
}
