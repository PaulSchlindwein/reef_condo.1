interface HighlightChipsProps {
  highlights: string[];
}

export function HighlightChips({ highlights }: HighlightChipsProps) {
  if (!highlights || highlights.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1">
      {highlights.map((highlight, idx) => (
        <span key={idx} className="px-2 py-1 bg-sand-light text-xs rounded-full text-gray-cool">
          {highlight}
        </span>
      ))}
    </div>
  );
}
