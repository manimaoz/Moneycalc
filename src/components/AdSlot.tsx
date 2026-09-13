interface AdSlotProps {
  variant?: 'horizontal' | 'square' | 'vertical';
  label?: string;
}

export default function AdSlot({ variant = 'horizontal', label = 'Advertisement' }: AdSlotProps) {
  const sizeClasses =
    variant === 'square'
      ? 'min-h-[250px]'
      : variant === 'vertical'
      ? 'min-h-[600px]'
      : 'min-h-[90px]';

  return (
    <div
      className={`flex w-full ${sizeClasses} items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50`}
      aria-label="ad-slot"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
        {label}
      </span>
    </div>
  );
}
