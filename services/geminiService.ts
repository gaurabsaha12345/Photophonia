
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface EditImageResult {
    image: string | null;
    text: string | null;
}

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<EditImageResult> => {
    const model = 'gemini-2.5-flash-image-preview';

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData.split(',')[1], // remove the data URI prefix
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let editedImage: string | null = null;
        let responseText: string | null = null;
        
        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    responseText = part.text;
                } else if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    editedImage = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                }
            }
        }
        
        return { image: editedImage, text: responseText };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to edit image with Gemini API.");
    }
};
