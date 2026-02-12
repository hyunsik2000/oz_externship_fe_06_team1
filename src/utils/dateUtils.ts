// 현재시간을 YYYY-MM-DD 형식으로 반환합니다.
export const getTodayDate = (): string => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

// 현재 시간을 HH : mm 형식으로 반환, 30분 단위로 올림/내림 처리.
export const getNearest30MinTime = (): string => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = now.getMinutes() < 30 ? '00' : '30'
  return `${hours}:${minutes}`
}

// 날짜(YYYY-MM-DD)와 시간(HH : mm)을 백엔드 규격(YYYY-MM-DD HH:mm:ss)으로 변환.
export const formatCorrectTime = (date: string, time: string): string => {
  if (!date || !time) return ''
  const normalizedTime = time.replace(/\s/g, '')
  return `${date} ${normalizedTime}:00`
}

/**
 * ISO 형식의 날짜 문자열을 YYYY-MM-DD HH:mm:ss 형식으로 변환
 * @param dateString - 2026-02-05T14:25:58.373052+09:00 형식이라면
 * @returns 2026.02.05 14:25:58 형식으로 반환
 */
export const formatDateTime = (
  dateString: string | undefined | null
): string => {
  if (
    dateString === undefined ||
    dateString === null ||
    dateString === '' ||
    dateString === '-'
  )
    return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 날짜 문자열을 YYYY.MM.DD 형식으로 변환 (시간 제외)
 */
export const formatDate = (dateString: string): string => {
  if (!dateString || dateString === '-') return dateString
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}
