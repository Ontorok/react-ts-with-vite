const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export function formatCurrency(num: number): string {
  const formattedNumbr = CURRENCY_FORMATTER.format(num);
  return formattedNumbr;
}
