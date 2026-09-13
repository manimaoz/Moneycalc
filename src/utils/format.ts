const indianNumberFormat = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

const indianDecimalFormat = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatINR(value: number): string {
  return `\u20B9${indianNumberFormat.format(Math.round(value))}`;
}

export function formatINRDecimal(value: number): string {
  return `\u20B9${indianDecimalFormat.format(value)}`;
}

export function formatNumber(value: number): string {
  return indianNumberFormat.format(Math.round(value));
}

export function formatNumberDecimal(value: number): string {
  return indianDecimalFormat.format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatCompactINR(value: number): string {
  if (value >= 10000000) return `\u20B9${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `\u20B9${(value / 100000).toFixed(2)} L`;
  if (value >= 1000) return `\u20B9${(value / 1000).toFixed(1)}K`;
  return formatINR(value);
}
