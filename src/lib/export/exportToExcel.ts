import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export const exportToExcel = async (
  data: Record<string, unknown>[],
  fileName: string
) => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    if (data.length > 0) {
      const columns = Object.keys(data[0]).map((key) => ({
        header: key.toUpperCase(),
        key: key,
        width: 15,
      }))
      worksheet.columns = columns
    }

    worksheet.addRows(data)

    const headerRow = worksheet.getRow(1)
    headerRow.font = { bold: true, color: { argb: 'ffffffff' } }
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ff666666' },
    }
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' }

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(blob, `${fileName}.xlsx`)
  } catch {
    // 전역 에러 처리
  }
}
