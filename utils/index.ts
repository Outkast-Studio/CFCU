export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Array of month names
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
