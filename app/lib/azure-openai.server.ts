import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { AzureOpenAI } from "openai";
import "dotenv/config";

interface GeneratedContent {
  mainContent: string;
  hashtags: string[];
  insights: string[];
}

export class AzureOpenAIService {
  private client: AzureOpenAI;

  constructor() {
    const scope = 'https://cognitiveservices.azure.com/.default';
    const credential = new DefaultAzureCredential();
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);

    const deployment = 'gpt-4o';
    const apiVersion = "2024-05-13";

    this.client = new AzureOpenAI({
      azureADTokenProvider,
      deployment,
      apiVersion
    });
  }

  async generateMicroblogContent(topic: string, tone: string, keywords?: string): Promise<GeneratedContent> {
    try {
      const result = await this.client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a professional content creator specializing in creating engaging, platform-optimized microblog posts."
          },
          {
            role: "user",
            content: this.createPrompt(topic, tone, keywords)
          }
        ],
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = result.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No content generated");
      }

      try {
        const parsedContent = JSON.parse(content);

        return {
          mainContent: parsedContent.mainContent,
          hashtags: parsedContent.hashtags,
          insights: parsedContent.insights,
        };
      } catch (error) {
        console.log("Error parsing content", error);
        throw new Error("Failed to parse generated content");
      }
    } catch (error) {
      console.log("Error generating content");
      throw error;
    }
  }

  private createPrompt(topic: string, tone: string, keywords?: string): string {
    return `
      Create a microblog post about "${topic}"${keywords ? ` incorporating these keywords: ${keywords}` : ''}.

      Use a ${tone} tone of voice.

      Guidelines:
      - Keep the main content under 280 characters.
      - Include relevant hashtags
      - Provide key insights about the topic
      - ${tone === 'technical' ? 'Include specific data or statistics when possible' : ''}
      - ${tone === 'casual' ? 'Use conversational language and relatable examples' : ''}
      - ${tone === 'motivational' ? 'Include action-oriented and inspiring messages' : ''}

      Format the response as JSON with: 
      {
        "mainContent": "the microblog post text",
        "hashtags": ["array", "of", "relevant", "hashtags"],
        "insights": ["array", "of", "key", "insights"]
      }
    `;
  }
}

export const azureOpenAIService = new AzureOpenAIService();