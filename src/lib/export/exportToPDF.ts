import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportToPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId)
  if (!element) return

  const finalFileName = fileName.trim() || `export_${new Date().getTime()}`

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  })

  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('l', 'mm', 'a4')
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(`${finalFileName}.pdf`)
}
