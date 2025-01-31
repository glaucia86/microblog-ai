import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { 
  SparklesIcon, 
  ChatBubbleBottomCenterTextIcon, 
  ArrowsRightLeftIcon 
} from '@heroicons/react/24/outline';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
};

const features: Feature[] = [
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: "Smart Insights",
    description: "Trend analysis and optimized hashtag suggestions to maximize your reach and engagement.",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />,
    title: "Adaptive Tone of Voice",
    description: "Choose between technical, casual, or motivational tones to effectively reach your target audience.",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    icon: <ArrowsRightLeftIcon className="w-6 h-6" />,
    title: "Multiple Variations",
    description: "Generate different versions of your content to find the perfect approach for your message.",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400"
  }
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Smart Microblog Generator | Create Impactful Content' },
    {
      name: 'description',
      content: 'Transform your ideas into engaging microblogs with AI. Generate optimized social media content with different tones of voice and trend-based insights.',
    },
  ];
};

function CTAButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full 
        shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 group"
    >
      {children}
      <svg
        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </Link>
  );
}

export default function Index() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 
      transition-colors duration-300'>
      {/* Hero Section */}
      <section className='px-4 pt-24 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center space-y-8'>
          <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl 
            bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 
            dark:from-white dark:to-gray-200 transition-colors duration-300'>
            <span className='block'>Smart Microblog</span>
            <span className='block text-blue-600 dark:text-blue-500'>
              Generator & Insights
            </span>
          </h1>

          <p className='mx-auto max-w-2xl text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300'>
            Transform your ideas into impactful social media content.
            Maximize your reach with AI-optimized posts.
          </p>

          <div className="mt-8">
            <CTAButton to="/generate">Get Started</CTAButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white dark:bg-gray-800 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300'>
              Powerful Features
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-2xl p-8 shadow-sm transition-all duration-300 
                  hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`rounded-lg bg-white dark:bg-gray-800 p-3 ${feature.iconColor} 
                    transition-colors duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white mb-8 
            transition-colors duration-300'>
            Ready to create impactful content?
          </h2>
          <CTAButton to="/generate">
            Start For Free
          </CTAButton>
        </div>
      </section>
    </div>
  );
}