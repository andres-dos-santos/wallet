export function currency(value: number) {
  return new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}
