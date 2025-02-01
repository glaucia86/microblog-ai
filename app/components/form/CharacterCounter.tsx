interface CharacterCounterProps {
  text: string;
  maxLength: number;
}

export function CharacterCounter({ text, maxLength }: CharacterCounterProps) {
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
