import React from 'react'
import PDFIcon from '@/assets/icons/PDF.svg?react'
import XLSIcon from '@/assets/icons/XLS.svg?react'
import { Button, Dropdown } from '@/components/common'
import { AdminContainer } from '@/components/layout'
import { exportToExcel, exportToPDF } from '@/lib/export'
import type { DropdownOption } from '@/types'
import { cn } from '@/lib/cn'

interface FilterConfig {
  id: string
  options: DropdownOption[]
  value: string
  placeholder?: string
  className?: string
  onChange: (value: string) => void
}

interface DashboardLayoutProps {
  titleOptions: DropdownOption[]
  currentTitleValue: string
  description: string
  filters: FilterConfig[]
  chartTitle: string
  children: React.ReactNode
  exportData?: Record<string, unknown>[]
  showSearchButton?: boolean
  chartContainerClassName?: string
  onTitleChange: (value: string) => void
  onSearch?: () => void
}

export function DashboardLayout({
  titleOptions,
  currentTitleValue,
  description,
  filters,
  chartTitle,
  children,
  exportData,
  showSearchButton = true,
  chartContainerClassName,
  onTitleChange,
  onSearch,
}: DashboardLayoutProps) {
  const handlePDFDownload = () => {
    exportToPDF('chart-report', chartTitle)
  }

  const handleExcelDownload = () => {
    if (!exportData) return
    exportToExcel(exportData, chartTitle)
  }

  const hasFilterBar = filters.length > 0 || showSearchButton

  return (
    <AdminContainer>
      <div id="chart-report">
        <div className="bg-white p-10">
          <div className="mb-4 flex gap-2">
            <PDFIcon
              className="cursor-pointer hover:opacity-80"
              onClick={handlePDFDownload}
            />
            <XLSIcon
              className="cursor-pointer hover:opacity-80"
              onClick={handleExcelDownload}
            />
          </div>
          <div className="mb-6">
            <Dropdown
              variant="ghost"
              options={titleOptions}
              value={currentTitleValue}
              onChange={onTitleChange}
              className="mb-1"
            />
            <p className="text-grey-600 text-sm">{description}</p>
          </div>

          {hasFilterBar && (
            <div className="mb-6 flex items-center gap-3">
              {filters.map((filter) => (
                <Dropdown
                  key={filter.id}
                  options={filter.options}
                  value={filter.value}
                  placeholder={filter.placeholder}
                  className={filter.className || 'w-48'}
                  onChange={filter.onChange}
                />
              ))}
              {showSearchButton && (
                <Button variant="secondary" onClick={onSearch}>
                  조회
                </Button>
              )}
            </div>
          )}

          <div className="w-full">
            {chartTitle && (
              <h3 className="text-grey-800 mb-8 text-sm font-bold">
                {chartTitle}
              </h3>
            )}
            <div
              className={cn(
                'relative w-[1400px]',
                chartContainerClassName || 'h-[500px]'
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  )
}
