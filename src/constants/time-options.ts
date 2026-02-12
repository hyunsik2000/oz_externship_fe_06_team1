export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, '0')
  const minute = i % 2 === 0 ? '00' : '30'
  return { value: `${hour}:${minute}`, label: `${hour} : ${minute}` }
})
