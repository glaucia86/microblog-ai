import { CharacterCounter } from './CharacterCounter';

interface EnhancedTextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
}

export function EnhancedTextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  error,
}: EnhancedTextInputProps) {
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
