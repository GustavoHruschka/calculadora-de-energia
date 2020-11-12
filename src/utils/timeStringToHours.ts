function timeStringToHours(timeString: string) {
  const [hoursString, minutesString] = timeString.split(':')
  const hours = Number(hoursString)
  const minutes = Number(minutesString)

  const timeInHours = hours + minutes / 60
  
  return timeInHours
}

export default timeStringToHours
