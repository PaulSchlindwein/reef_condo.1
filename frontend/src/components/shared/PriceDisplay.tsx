interface PriceDisplayProps {
  priceRange: string;
}

export function getPriceDisplay(priceRange: string) {
  const ranges = {
    '$': '$',
    '$$': '$$',
    '$$$': '$$$',
    '$$$$': '$$$$',
    'included': 'Included',
    'free': 'Free'
  };
  return ranges[priceRange as keyof typeof ranges] || priceRange;
}

export function PriceDisplay({ priceRange }: PriceDisplayProps) {
  return <span className="font-medium">{getPriceDisplay(priceRange)}</span>;
}
