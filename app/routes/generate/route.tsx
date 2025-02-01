import { ActionFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';

// Services
import { azureOpenAIService } from '~/lib/azure-openai.server';

// Components
import { EnhancedTextInput } from '~/components/form/EnhancedTextInput';
import { ToneSelector } from '~/components/form/ToneSelector';
import { LoadingOverlay } from '~/components/feedback/LoadingOverlay';
import { SuccessNotification } from '~/components/feedback/SuccessNotification';
import { PreviewCard } from '~/components/preview/PreviewCard';

// Tipos
import type {
  FormState,
  FormErrors,
  ActionData,
  GeneratedContent,
} from './types';
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

export default function Generate() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    topic: '',
    tone: 'casual',
    keywords: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const isGenerating = navigation.state === 'submitting';

  // Manage success notification
  useEffect(() => {
    if (actionData?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }

    if (formState.topic.length > 100) {
      newErrors.topic = 'Topic must be less than 100 characters';
    }

    if (formState.keywords.length > 200) {
      newErrors.keywords = 'Keywords must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  };

  // Form state update handlers
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, topic: e.target.value }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, keywords: e.target.value }));
  };

  const handleToneChange = (tone: FormState['tone']) => {
    setFormState((prev) => ({ ...prev, tone }));
  };

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto space-y-8'>
        {/* Form */}
        <Form method='post' onSubmit={handleSubmit} className='space-y-6'>
          <EnhancedTextInput
            label='Topic'
            name='topic'
            value={formState.topic}
            onChange={handleTopicChange}
            placeholder='Enter the main topic for your microblog post'
            required
            maxLength={100}
            error={errors.topic}
          />

          <ToneSelector value={formState.tone} onChange={handleToneChange} />

          <EnhancedTextInput
            label='Keywords (Optional)'
            name='keywords'
            value={formState.keywords}
            onChange={handleKeywordsChange}
            placeholder='Enter relevant keywords separated by commas'
            maxLength={200}
            error={errors.keywords}
          />

          <button
            type='submit'
            disabled={isGenerating}
            className={`
              w-full flex justify-center py-3 px-4 
              border border-transparent rounded-lg shadow-sm 
              text-sm font-medium text-white
              bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
            `}
          >
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </button>
        </Form>

        {/* Error message */}
        {actionData?.error && (
          <div
            className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 
            dark:text-red-400 rounded-lg'
          >
            {actionData.error}
          </div>
        )}

        {/* Generated content preview */}
        {actionData?.content && <PreviewCard content={actionData.content} />}

        {/* Componentes de feedback */}
        {isGenerating && <LoadingOverlay />}
        {showSuccess && <SuccessNotification />}
      </div>
    </div>
  );
}
