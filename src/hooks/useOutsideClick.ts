import { useEffect } from 'react'

export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onOutside: () => void,
  active: boolean = true,
  ignoreRefs: Array<React.RefObject<HTMLElement | null>> = []
) {
  useEffect(() => {
    if (!active) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!ref.current) return

      const isInIgnore = ignoreRefs.some((r) => r.current?.contains(target))
      if (isInIgnore) return

      if (!ref.current.contains(event.target as Node)) {
        onOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onOutside, active, ignoreRefs])
}
