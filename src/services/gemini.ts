import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const translateText = async (text: string, sourceLang: string, targetLang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là một chuyên gia ngôn ngữ học về các dân tộc thiểu số Việt Nam. 
    Dịch văn bản sau từ ${sourceLang} sang ${targetLang}. 
    Nếu targetLang là tiếng dân tộc (Mông, Thái, Khơ Mú...), hãy cung cấp cả phiên âm.
    Văn bản: "${text}"`,
    });
    
    return response.text || "Không thể dịch văn bản này.";
  } catch (error) {
    console.error("Translation error:", error);
    return "Tính năng dịch đang được bảo trì. Vui lòng thử lại sau.";
  }
};
