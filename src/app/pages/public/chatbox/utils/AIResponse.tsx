import axios from 'axios';

export interface Message{
  role: string,
  content: string
}

export interface Content {
  type: string,
  text: string
}

interface RequestMessage {
  role: string
  content: Content[]
}

interface Request {
  model: string,
  messages: RequestMessage[]
}

interface Response {
  id: string,
  provider: string,
  model: string,
  object: string,
  created: string,
  choices: Choice[],
  usage: Usage
}

interface Choice {
  logprobs: string,
  finish_reason: string,
  native_finish_reason: string,
  index: number,
  message: ResponseMessage
}

export interface ResponseMessage {
  role: string,
  content: string,
  refusal: string,
  reasoning: string
}

interface Usage {
  prompt_tokens: number,
  completion_tokens: number,
  total_tokens: number,
  prompt_tokens_details: string
}

export const getAIResponse = async (userMessage: string): Promise<ResponseMessage> => {

  const token = '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'

  const request: Request = {
    model: "moonshotai/kimi-k2:free",
    messages: [{
      role: "user",
      content: [{ type: "text", text: userMessage }]
    }]
  };

  const api = axios.create({
    baseURL: 'https://openrouter.ai/api/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const res = await api.post<Response>('', request);
  return res.data.choices[0]?.message || 'Not Response';
};