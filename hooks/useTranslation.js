import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';

const useTranslation = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const translate = async (text, targetLanguage = 'Japanese') => {
    if (!text) return;

    setIsTranslating(true);
    setError(null);
    setTranslatedText('');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Translate the following English text to ${targetLanguage}:\n\n${text}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const translated = response.text();
      
      setTranslatedText(translated);
    } catch (e) {
      console.error(e);
      setError('翻訳中にエラーが発生しました。');
    } finally {
      setIsTranslating(false);
    }
  };

  return { translatedText, isTranslating, error, translate };
};

export default useTranslation;
