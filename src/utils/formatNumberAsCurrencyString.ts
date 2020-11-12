function formatNumberAsCurrencyString(value: number) {
  return value.toFixed(2).replace('.', ',')
}

export default formatNumberAsCurrencyString