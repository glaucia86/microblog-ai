import { GeneratedContent } from '~/routes/generate/types';

interface PreviewCardProps {
  content: GeneratedContent;
}

export function PreviewCard({ content }: PreviewCardProps) {
  return (
    <div className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
      {/* Main Content */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>
          Generated Content
        </h3>
        <p className='text-gray-700 dark:text-gray-300 whitespace-pre-wrap'>
          {content.mainContent}
        </p>
      </div>
      {/* Hashtags */}
      <div>
        <h4 className='text-sm font-medium text-gray-900 dark:text-white mb-2'>
          Suggested Hashtags
        </h4>
        <div className='flex flex-wrap gap-2'>
          {content.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className='inline-flex items-center px-3 py-1 rounded-full
                text-sm font-medium bg-blue-50 dark:bg-blue-900/20
                text-blue-600 dark:text-blue-400'
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div>
        <h4 className='text-sm font-medium text-gray-900 dark:text-white mb-2'>
          Content Insights
        </h4>
        <ul className='space-y-2'>
          {content.insights.map((insight, index) => (
            <li
              key={index}
              className='flex items-start text-sm text-gray-700 dark:text-gray-300'
            >
              <span className='mr-2'>•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
