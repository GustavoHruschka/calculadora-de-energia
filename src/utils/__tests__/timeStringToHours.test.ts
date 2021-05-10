import timeStringToHours from '../timeStringToHours'

test("The time inputs are beeing converted to hours correctly", () => {
  expect(timeStringToHours('01:30')).toBe(1.5)
})