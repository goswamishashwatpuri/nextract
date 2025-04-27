import { GoogleGenerativeAI } from "@google/generative-ai";

export const createGeminiModelInstance = (apiKeyPlainText?: string) => {
  const genAI = new GoogleGenerativeAI(apiKeyPlainText!);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a webscraper helper that extracts data from HTML or text. 
  
    You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. 
  
    The response should always be only the extracted data as a JSON object, without any additional words or explanations. 
  
    Analyze the input carefully and extract data precisely based on the prompt. 
    If no data is found, return an empty JSON object. 
    
    # IMPORTANT
    Work only with the provided content and ensure the output is always a valid JSON without any surrounding text`,
  });

  const nextractAiSession = geminiModel.startChat({
    generationConfig,
    history: [
    ],
  });

  return nextractAiSession;
}
