const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const formatCurrency = (num) => {
  return formatter.format(num);
};
