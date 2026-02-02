// 현재시간을 YYYY-MM-DD 형식으로 반환합니다.
export const getTodayDate = (): string => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

// 현재 시간을 HH : mm 형식으로 반환, 30분 단위로 올림/내림 처리.
export const getNearest30MinTime = (): string => {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')} : ${now.getMinutes() < 30 ? '00' : '30'}`
}

// 날짜(YYYY-MM-DD)와 시간(HH : mm)을 백엔드 규격(YYYY-MM-DD HH:mm:ss)으로 변환.
export const formatCorrectTime = (date: string, time: string): string => {
  if (!date || !time) return ''
  const normalizedTime = time.replace(/\s/g, '')
  return `${date} ${normalizedTime}:00`
}
