/**
 * 쿠키 설정 setCookie
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param hours 유지 기간 (N 시간)
 */
export const setCookie = (name: string, value: string, hours: number = 1) => {
  const date = new Date()
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  const expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

/**
 * 이름으로 쿠키 가져오기 getCookie
 * @param name 쿠키 이름
 * @returns 쿠키 값
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * 이름으로 쿠키 삭제 removeCookie
 * @param name 쿠키 이름
 */
export const removeCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999; path=/'
}
