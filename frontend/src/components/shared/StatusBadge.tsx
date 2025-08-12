interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    active: 'bg-success-green text-white',
    closed: 'bg-red-500 text-white',
    seasonal: 'bg-yellow-500 text-white'
  };
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles] || styles.active}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
