import { ActionFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { SparklesIcon, CheckIcon } from '@heroicons/react/24/outline';
import { azureOpenAIService } from '../lib/azure-openai.server';
import { error } from 'console';

// Define our TypeScript types for better code maintainability and type safety
type ToneOfVoice = 'technical' | 'casual' | 'motivational';

interface GeneratedContent {
  mainContent: string;
  hashtags: string[];
  insights: string[];
}

// Interface for form state management
interface FormState {
  topic: string;
  tone: ToneOfVoice;
  keywords: string;
}

// Interface for form validation errors
interface FormErrors {
  topic?: string;
  keywords?: string;
}

type ActionData = {
  success?: boolean;
  content?: GeneratedContent;
  error?: string;
};

// Server-side action function to handle form submissions
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const topic = formData.get('topic');
  const tone = formData.get('tone');
  const keywords = formData.get('keywords');

  // Basic server-side validation
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

  // TODO: Implement AI content generation logic
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
  } catch (error) {
    console.log('Generation error', error);
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

// Enhanced text input component with validation and character counter
function EnhancedTextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
}) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-baseline'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700 dark:text-gray-200'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        {maxLength && <CharacterCounter text={value} maxLength={maxLength} />}
      </div>
      <input
        type='text'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 rounded-lg border 
          ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          }
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-white
          focus:ring-2 focus:border-transparent
          transition duration-200 ease-in-out
          placeholder-gray-400 dark:placeholder-gray-500
        `}
      />
      {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
    </div>
  );
}

// Character counter component with visual feedback
function CharacterCounter({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) {
  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= maxLength * 0.1;

  return (
    <div
      className={`
        text-xs transition-colors duration-200
        ${isNearLimit ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}
      `}
    >
      {remainingChars} characters remaining
    </div>
  );
}

// Loading indicator overlay component
function LoadingOverlay() {
  return (
    <div
      className='fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm 
      flex items-center justify-center z-50'
    >
      <div
        className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl 
        flex items-center space-x-4'
      >
        <SparklesIcon className='w-6 h-6 text-blue-500 animate-spin' />
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-gray-900 dark:text-white'>
            Generating Your Content
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            This might take a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

// Success notification component
function SuccessNotification() {
  return (
    <div
      className='fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 
      rounded-lg shadow-lg flex items-center space-x-2 animate-slide-up'
    >
      <CheckIcon className='w-5 h-5' />
      <span>Content generated successfully!</span>
    </div>
  );
}

// Preview card component showing example output
function PreviewCard() {
  return (
    <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
        Example Output Preview
      </h3>
      <div className='space-y-6'>
        <div className='prose dark:prose-invert max-w-none'>
          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Technical Tone:
          </span>
          <blockquote className='mt-2 text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4'>
            "Exploring the latest developments in #AI: Recent breakthroughs in
            large language models demonstrate significant improvements in
            natural language understanding..."
          </blockquote>
        </div>

        <div className='border-t border-blue-200 dark:border-blue-800 pt-4'>
          <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
            Your generated content will include:
          </p>
          <ul className='space-y-3'>
            {[
              'Optimized hashtag suggestions',
              'Engagement-focused writing style',
              'Trend analysis insights',
            ].map((feature, index) => (
              <li
                key={index}
                className='flex items-center text-sm text-gray-600 dark:text-gray-400'
              >
                <SparklesIcon className='w-4 h-4 text-blue-500 mr-2 flex-shrink-0' />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Tone selector component
function ToneSelector({
  value,
  onChange,
}: {
  value: ToneOfVoice;
  onChange: (tone: ToneOfVoice) => void;
}) {
  const tones = [
    {
      value: 'technical',
      label: 'Technical',
      description: 'Professional and detailed approach',
    },
    {
      value: 'casual',
      label: 'Casual',
      description: 'Friendly and conversational style',
    },
    {
      value: 'motivational',
      label: 'Motivational',
      description: 'Inspiring and energetic tone',
    },
  ] as const;

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
        Select Tone of Voice
      </label>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {tones.map((tone) => (
          <button
            key={tone.value}
            type='button'
            onClick={() => onChange(tone.value)}
            className={`p-4 rounded-lg border transition-all duration-200 text-left
              ${
                value === tone.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
          >
            <div className='font-medium text-gray-900 dark:text-white'>
              {tone.label}
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              {tone.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Main component that brings everything together
export default function Generate() {
  // Estados internos
  const [formState, setFormState] = useState<FormState>({
    topic: '',
    tone: 'casual',
    keywords: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const navigation = useNavigation();
  const actionData = useActionData<ActionData>();
  const isGenerating = navigation.state === 'submitting';

  // Efeito para mostrar/ocultar notificação de sucesso
  useEffect(() => {
    if (actionData?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData?.success]);

  // Função de validação do formulário
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formState.topic.trim()) {
      newErrors.topic = 'Please enter a topic for your microblog';
    } else if (formState.topic.length < 5) {
      newErrors.topic = 'Topic should be at least 5 characters long';
    }

    if (formState.keywords && formState.keywords.split(',').length > 5) {
      newErrors.keywords = 'Please enter no more than 5 keywords';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler de submit
  const handleSubmit = (e: React.FormEvent) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  };

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

        {/* Form principal */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
          <Form method='post' onSubmit={handleSubmit} className='space-y-8'>
            <EnhancedTextInput
              label='Topic or Main Idea'
              name='topic'
              value={formState.topic}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  topic: e.target.value,
                }))
              }
              placeholder='Enter the main topic of your microblog'
              required
              maxLength={100}
              error={errors.topic}
            />

            {/* Tom de voz */}
            <input type='hidden' name='tone' value={formState.tone} />
            <ToneSelector
              value={formState.tone}
              onChange={(tone) =>
                setFormState((prev) => ({
                  ...prev,
                  tone,
                }))
              }
            />

            <EnhancedTextInput
              label='Keywords (optional)'
              name='keywords'
              value={formState.keywords}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  keywords: e.target.value,
                }))
              }
              placeholder='Enter relevant keywords, separated by commas'
              maxLength={150}
              error={errors.keywords}
            />

            <button
              type='submit'
              disabled={isGenerating}
              className='w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-medium
                transition-all duration-300 transform hover:scale-[1.02] hover:bg-blue-700
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl'
            >
              {isGenerating ? (
                <>
                  <SparklesIcon className='w-5 h-5 animate-spin' />
                  <span>Generating Amazing Content...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className='w-5 h-5' />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </Form>

          {/* Pré-visualização de exemplo */}
          <PreviewCard />

          {/* Exibição do conteúdo retornado pela Action */}
          {actionData?.success && actionData.content && (
            <div className='mt-8 p-4 rounded bg-green-50 border border-green-200'>
              <h2 className='text-lg font-bold mb-2'>Microblog gerado</h2>
              <p>
                <strong>Texto:</strong> {actionData.content.mainContent}
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

          {/* CTA extra */}
          <div className='mt-12 border-t border-gray-200 dark:border-gray-700 pt-8'>
            <div className='text-center'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                Want to Learn More?
              </h3>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                Discover how our AI-powered content generator can help you
                create engaging content that resonates with your audience.
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
    </div>
  );
}
