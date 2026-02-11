import { useState, useMemo, useCallback } from 'react'
import type { DropdownOption } from '@/types'
import type { FilterRowConfig } from '@/components/common'

export interface FilterOptionConfig {
  key: string
  label?: string
  placeholder: string
  options: DropdownOption[]
  disabled?: boolean
  resetOnChange?: string[]
}

export function useFilter(configs: FilterOptionConfig[]) {
  const [isOpen, setIsOpen] = useState(false)

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(configs.map((conf) => [conf.key, '']))
  )

  const openFilter = useCallback(() => setIsOpen(true), [])
  const closeFilter = useCallback(() => setIsOpen(false), [])

  const handleChange = useCallback(
    (key: string, nextValue: string) => {
      const config = configs.find((conf) => conf.key === key)
      setValues((prev) => {
        const next = { ...prev, [key]: nextValue }
        if (config?.resetOnChange) {
          config.resetOnChange.forEach((fieldToReset) => {
            next[fieldToReset] = ''
          })
        }
        return next
      })
    },
    [configs]
  )

  const rows: FilterRowConfig[] = useMemo(() => {
    return configs.map((conf) => ({
      id: conf.key,
      label: conf.label ?? '',
      placeholder: conf.placeholder,
      options: conf.options,
      value: values[conf.key],
      disabled: conf.disabled,
      onChange: (val: string) => handleChange(conf.key, val),
    }))
  }, [configs, values, handleChange])

  const summary = useMemo(() => {
    const labels = configs
      .map((conf) => {
        const option = conf.options.find(
          (opt) => opt.value === values[conf.key]
        )
        return option?.label || ''
      })
      .filter(Boolean)

    return labels.join(' > ') || ''
  }, [configs, values])

  const canSubmit = useMemo(() => {
    // 선택된 값이 옵션 목록에 존재하는지 확인하는 방식으로변경
    return configs
      .filter((conf) => !conf.disabled)
      .every((conf) => {
        const currentValue = values[conf.key]
        return conf.options.some((opt) => opt.value === currentValue)
      })
  }, [configs, values])

  return {
    isOpen,
    openFilter,
    closeFilter,
    values,
    rows,
    summary,
    canSubmit,
    setValues,
  }
}
