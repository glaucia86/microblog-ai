import { ActionFunction, json } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useState } from 'react';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const topic = formData.get('topic');
  const tone = formData.get('tone');
  const keywords = formData.get('keywords');

  // TODO: Implement your AI content generation logic here
  return json({ success: true });
};
import {
  SparklesIcon,
  DocumentDuplicateIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

// We define our form data types for better TypeScript support
type ToneOfVoice = 'technical' | 'casual' | 'motivational';

interface FormData {
  topic: string;
  tone: ToneOfVoice;
  keywords?: string;
}

// A reusable component for text input fields with consistent styling
function TextInput({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  // This component creates a styled input field with a label
  return (
    <div className='space-y-2'>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 dark:text-gray-200'
      >
        {label}
      </label>
      <input
        type='text'
        name={name}
        id={name}
        required={required}
        placeholder={placeholder}
        className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition duration-200 ease-in-out
          placeholder-gray-400 dark:placeholder-gray-500'
      />
    </div>
  );
}

// A component for selecting the tone of voice with visual feedback
function ToneSelector({
  value,
  onChange,
}: {
  value: ToneOfVoice;
  onChange: (tone: ToneOfVoice) => void;
}) {
  // This array defines our available tones and their descriptions
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

// The main form component that handles content generation
export default function Generate() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [selectedTone, setSelectedTone] = useState<ToneOfVoice>('casual');
  const isGenerating = navigation.state === 'submitting';

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header section with title and description */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Generate Your Microblog
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Fill in the details below and let AI create engaging content for you
          </p>
        </div>

        {/* Main form with interactive elements */}
        <Form method='post' className='space-y-8'>
          <TextInput
            label='Topic or Main Idea'
            name='topic'
            placeholder='Enter the main topic of your microblog'
            required
          />

          <ToneSelector value={selectedTone} onChange={setSelectedTone} />

          <TextInput
            label='Keywords (optional)'
            name='keywords'
            placeholder='Enter relevant keywords, separated by commas'
          />

          <button
            type='submit'
            disabled={isGenerating}
            className='w-full py-4 px-6 text-white bg-blue-600 hover:bg-blue-700 
              rounded-lg font-medium transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center space-x-2'
          >
            {isGenerating ? (
              <>
                <SparklesIcon className='w-5 h-5 animate-spin' />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className='w-5 h-5' />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
