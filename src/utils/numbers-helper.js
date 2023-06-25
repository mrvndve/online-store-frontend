export const priceFormatter = (num) => {
  return parseFloat(num.replace(/,/g, '')).toFixed(2);
};

export const withCommasAndDecimal = (num) => {
  return Number(parseFloat(num).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
  });
}
