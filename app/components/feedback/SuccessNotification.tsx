import { CheckCircleIcon } from '@heroicons/react/24/outline';

export function SuccessNotification() {
  return (
    <div
      className='fixed bottom-4 right-4 flex items-center bg-green-50 dark:bg-green-900/20 
      text-green-600 dark:text-green-400 px-4 py-3 rounded-lg shadow-lg'
    >
      <CheckCircleIcon className='w-5 h-5 mr-2' />
      <span>Content generated successfully!</span>
    </div>
  );
}
