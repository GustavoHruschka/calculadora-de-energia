import formatNumberAsCurrencyString from '../formatNumberAsCurrencyString'

test("The prices are beeing converted to currency correctly", () => {
  expect(formatNumberAsCurrencyString(89.991)).toBe('89,99')
})