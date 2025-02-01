import { ActionFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import LoadingOverlay from '~/components/LoadingOverlay';
import SuccessNotification from '~/components/SuccessNotification';
import PreviewCard from '~/components/PreviewCard';
import ToneSelector from '~/components/ToneSelector';
import EnhancedTextInput from '~/components/EnhancedTextInput';
import { azureOpenAIService } from '../services/openaiService';

type ToneOfVoice = 'technical' | 'casual' | 'motivational';

type GeneratedContent = {
  mainContent: string;
  hashtags: string[];
  insights: string[];
};

type ActionData = {
  success?: boolean;
  content?: GeneratedContent;
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const topic = formData.get('topic');
  const tone = formData.get('tone');
  const keywords = formData.get('keywords');

  if (!topic || typeof topic !== 'string') {
    return Response.json({ error: 'Topic is required.' }, { status: 400 });
  }

  try {
    const generatedContent = await azureOpenAIService.generateMicroblogContent(
      topic,
      tone?.toString() || 'casual',
      keywords?.toString()
    );

    return Response.json(
      { success: true, content: generatedContent },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { error: 'Failed to generate content.' },
      { status: 500 }
    );
  }
};

export default function Generate() {
  const [formState, setFormState] = useState({
    topic: '',
    tone: 'casual',
    keywords: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigation = useNavigation();
  const actionData = useActionData<ActionData>();
  const isGenerating = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [actionData?.success]);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1
            className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
            from-gray-900 to-gray-700 dark:from-white dark:to-gray-200'
          >
            Generate Your Microblog
          </h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Fill in the details below and let AI create engaging content for you
          </p>
        </div>

        {/* Main Form */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
          <Form method='post' className='space-y-8'>
            <EnhancedTextInput
              label='Topic or Main Idea'
              name='topic'
              value={formState.topic}
              onChange={(e) =>
                setFormState({ ...formState, topic: e.target.value })
              }
              placeholder='Enter a topic'
              required
              maxLength={100}
            />
            <ToneSelector
              value={formState.tone as ToneOfVoice}
              onChange={(tone) => setFormState({ ...formState, tone })}
            />
            <EnhancedTextInput
              label='Keywords (optional)'
              name='keywords'
              value={formState.keywords}
              onChange={(e) =>
                setFormState({ ...formState, keywords: e.target.value })
              }
              placeholder='Enter keywords, separated by commas'
              maxLength={150}
            />
            <button
              type='submit'
              disabled={isGenerating}
              className='w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-medium
                transition-all duration-300 transform hover:scale-[1.02] hover:bg-blue-700
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl'
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </Form>

          {/* Exibir preview da saída gerada */}
          <PreviewCard />

          {/* Exibir o conteúdo retornado pela API */}
          {actionData?.success && actionData.content && (
            <div className='mt-8 p-4 rounded bg-green-50 border border-green-200'>
              <h2 className='text-lg font-bold mb-2'>Microblog generated</h2>
              <p>
                <strong>Text:</strong> {actionData.content.mainContent}
              </p>
              <p>
                <strong>Hashtags:</strong>{' '}
                {actionData.content.hashtags.join(', ')}
              </p>
              <div>
                <strong>Insights:</strong>
                <ul className='list-disc list-inside'>
                  {actionData.content.insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* CTA extra */}
        <div className='mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
            Want to Learn More?
          </h3>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Discover how our AI-powered content generator can help you create
            engaging content that resonates with your audience.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='#tips'
              className='inline-flex items-center px-6 py-3 text-sm font-medium 
                text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg 
                hover:bg-blue-100 dark:hover:bg-blue-900/30
                transition-colors duration-200'
            >
              View Writing Tips
            </a>
            <a
              href='#examples'
              className='inline-flex items-center px-6 py-3 text-sm font-medium 
                text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 
                rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-200'
            >
              See Examples
            </a>
          </div>
        </div>
      </div>

      {/* Exibição de erro caso a Action retorne um erro */}
      {actionData?.error && (
        <div
          className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 
          dark:text-red-400 rounded-lg'
        >
          {actionData.error}
        </div>
      )}

      {/* Loading e notificação de sucesso */}
      {isGenerating && <LoadingOverlay />}
      {showSuccess && <SuccessNotification />}
    </div>
  );
}
