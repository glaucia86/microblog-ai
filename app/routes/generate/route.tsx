import { ActionFunction } from '@remix-run/node';
import { azureOpenAIService } from '../../lib/azure-openai.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const topic = formData.get('topic');
  const tone = formData.get('tone');
  const keywords = formData.get('keywords');

  if (!topic || typeof topic !== 'string') {
    return Response.json(
      {
        error: 'Topic is required. Please enter a topic for your microblog.',
      },
      {
        status: 400,
      }
    );
  }

  try {
    const generatedContent = await azureOpenAIService.generateMicroblogContent(
      topic,
      tone?.toString() || 'casual',
      keywords?.toString()
    );

    return Response.json(
      {
        success: true,
        content: generatedContent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error generating content:', error);
    return Response.json(
      {
        error: 'Failed to generate content. Please try again.',
      },
      {
        status: 500,
      }
    );
  }
};
