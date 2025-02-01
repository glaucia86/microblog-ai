type ToneOfVoice = 'technical' | 'casual' | 'motivational';

interface GeneratedContent {
  mainContent: string;
  hashtags: string[];
  insights: string[];
}

interface FormState {
  topic: string;
  tone: ToneOfVoice;
  keywords: string;
}

interface FormErrors {
  topic?: string;
  keywords?: string;
}

type ActionData = {
  success?: boolean;
  content?: GeneratedContent;
  error?: string;
};

export type { ToneOfVoice, GeneratedContent, FormState, FormErrors, ActionData };
