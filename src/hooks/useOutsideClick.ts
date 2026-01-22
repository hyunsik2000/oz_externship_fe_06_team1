import { useEffect } from 'react'

export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onOutside: () => void,
  active: boolean = true
) {
  useEffect(() => {
    if (!active) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(event.target as Node)) {
        onOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutside, active])
}
