interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  prefix?: string;
  suffix?: string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
}: SliderInputProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="input-label">{label}</label>
        <span className="rounded-lg bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-primary-600"
      />
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>{min.toLocaleString('en-IN')}</span>
        <span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}
