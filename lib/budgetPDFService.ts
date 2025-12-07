import { BudgetData } from './types/budget'

// Este archivo usa jsPDF que solo funciona en el cliente o en API routes con imports dinámicos
// Por eso usamos tipos any temporalmente para evitar errores de compilación

export async function generateBudgetPDF(budgetData: BudgetData): Promise<Blob> {
  // Importación dinámica de jsPDF para que funcione en servidor
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20

  // Colores corporativos
  const primaryColor: [number, number, number] = [226, 148, 58] // #e2943a naranja Fuegos d'Azur
  const darkGray: [number, number, number] = [51, 51, 51]
  const lightGray: [number, number, number] = [245, 245, 245]

  let yPosition = margin

  // ========== HEADER ==========
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text("🔥 Fuegos d'Azur", margin, 20)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Service Traiteur - Asado Argentin', margin, 30)

  yPosition = 50

  // ========== TÍTULO ==========
  doc.setTextColor(...darkGray)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('DEVIS / PRESUPUESTO', margin, yPosition)
  yPosition += 10

  // ========== INFO CLIENTE Y EMPRESA ==========
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  // Columna izquierda: Cliente
  const leftColumn = margin
  const rightColumn = pageWidth / 2 + 10

  doc.setFont('helvetica', 'bold')
  doc.text('CLIENT:', leftColumn, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(budgetData.clientInfo.name, leftColumn, yPosition + 5)
  doc.text(budgetData.clientInfo.email, leftColumn, yPosition + 10)
  doc.text(budgetData.clientInfo.phone, leftColumn, yPosition + 15)

  // Columna derecha: Empresa
  doc.setFont('helvetica', 'bold')
  doc.text("FUEGOS D'AZUR:", rightColumn, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text('07 50 85 35 99', rightColumn, yPosition + 5)
  doc.text('fuegosdazur@proton.me', rightColumn, yPosition + 10)
  doc.text('Côte d\'Azur, France', rightColumn, yPosition + 15)

  yPosition += 25

  // ========== DETALLES DEL EVENTO ==========
  doc.setFillColor(...lightGray)
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 20, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('DÉTAILS DE L\'ÉVÉNEMENT', margin + 5, yPosition + 7)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`Type: ${budgetData.clientInfo.eventType}`, margin + 5, yPosition + 12)
  doc.text(`Date: ${new Date(budgetData.clientInfo.eventDate).toLocaleDateString('fr-FR')}`, margin + 5, yPosition + 16)
  doc.text(`Invités: ${budgetData.clientInfo.guestCount} personnes`, rightColumn, yPosition + 12)
  doc.text(`Menu: ${budgetData.clientInfo.menuType === 'dejeuner' ? 'Déjeuner' : 'Dîner'}`, rightColumn, yPosition + 16)

  yPosition += 28

  // ========== MENU ==========
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...primaryColor)
  doc.text('🍽️ MENU', margin, yPosition)
  yPosition += 7

  doc.setTextColor(...darkGray)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  // Entrées
  if (budgetData.menu.entrees && budgetData.menu.entrees.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.text('Entrées:', margin, yPosition)
    doc.setFont('helvetica', 'normal')
    yPosition += 4
    budgetData.menu.entrees.forEach((entree) => {
      doc.text(`• ${entree.name}`, margin + 5, yPosition)
      yPosition += 4
    })
    yPosition += 2
  }

  // Viandes
  if (budgetData.menu.viandes && budgetData.menu.viandes.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.text('Viandes:', margin, yPosition)
    doc.setFont('helvetica', 'normal')
    yPosition += 4
    budgetData.menu.viandes.forEach((viande) => {
      doc.text(`• ${viande.name}`, margin + 5, yPosition)
      yPosition += 4
    })
    yPosition += 2
  }

  // Accompagnements
  if (budgetData.menu.accompagnements && budgetData.menu.accompagnements.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.text('Accompagnements:', margin, yPosition)
    doc.setFont('helvetica', 'normal')
    yPosition += 4
    budgetData.menu.accompagnements.forEach((acc) => {
      doc.text(`• ${acc}`, margin + 5, yPosition)
      yPosition += 4
    })
    yPosition += 2
  }

  // Dessert
  if (budgetData.menu.dessert) {
    doc.setFont('helvetica', 'bold')
    doc.text('Dessert:', margin, yPosition)
    doc.setFont('helvetica', 'normal')
    yPosition += 4
    doc.text(`• ${budgetData.menu.dessert.name}`, margin + 5, yPosition)
    yPosition += 6
  }

  // Montant Menu
  const menuTableY = yPosition
  autoTable(doc, {
    startY: menuTableY,
    head: [['Description', 'Montant']],
    body: [
      ['Prix par personne', `${budgetData.menu.pricePerPerson.toFixed(2)} €`],
      ['Nombre de personnes', budgetData.menu.totalPersons.toString()],
      ['Total HT', `${budgetData.menu.totalHT.toFixed(2)} €`],
      [`TVA (${budgetData.menu.tvaPct}%)`, `${budgetData.menu.tva.toFixed(2)} €`],
      ['Total TTC Menu', `${budgetData.menu.totalTTC.toFixed(2)} €`]
    ],
    theme: 'striped',
    headStyles: { fillColor: primaryColor, textColor: 255 },
    margin: { left: margin, right: margin },
    styles: { fontSize: 9 }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yPosition = (doc as any).lastAutoTable.finalY + 10

  // ========== MATERIAL (si aplica) ==========
  if (budgetData.material && budgetData.material.items.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(...primaryColor)
    doc.text('📦 MATÉRIEL', margin, yPosition)
    yPosition += 7

    const materialBody = budgetData.material.items.map(item => [
      item.name,
      item.quantity.toString(),
      `${item.pricePerUnit.toFixed(2)} €`,
      `${item.total.toFixed(2)} €`
    ])

    if (budgetData.material.gestionFee) {
      materialBody.push(['Gestion', '', '', `${budgetData.material.gestionFee.toFixed(2)} €`])
    }
    if (budgetData.material.deliveryFee) {
      materialBody.push(['Livraison', '', '', `${budgetData.material.deliveryFee.toFixed(2)} €`])
    }

    materialBody.push(
      ['Total HT', '', '', `${budgetData.material.totalHT.toFixed(2)} €`],
      [`TVA (${budgetData.material.tvaPct}%)`, '', '', `${budgetData.material.tva.toFixed(2)} €`],
      ['Total TTC Matériel', '', '', `${budgetData.material.totalTTC.toFixed(2)} €`]
    )

    autoTable(doc, {
      startY: yPosition,
      head: [['Item', 'Qté', 'Prix Unit.', 'Total']],
      body: materialBody,
      theme: 'striped',
      headStyles: { fillColor: primaryColor, textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPosition = (doc as any).lastAutoTable.finalY + 10
  }

  // ========== DÉPLACEMENT (si aplica) ==========
  if (budgetData.deplacement && budgetData.deplacement.distance > 50) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(...primaryColor)
    doc.text('🚗 DÉPLACEMENT', margin, yPosition)
    yPosition += 7

    autoTable(doc, {
      startY: yPosition,
      head: [['Description', 'Montant']],
      body: [
        [`Distance: ${budgetData.deplacement.distance} km`, ''],
        ['Total HT', `${budgetData.deplacement.totalHT.toFixed(2)} €`],
        [`TVA (${budgetData.deplacement.tvaPct}%)`, `${budgetData.deplacement.tva.toFixed(2)} €`],
        ['Total TTC Déplacement', `${budgetData.deplacement.totalTTC.toFixed(2)} €`]
      ],
      theme: 'striped',
      headStyles: { fillColor: primaryColor, textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPosition = (doc as any).lastAutoTable.finalY + 10
  }

  // ========== SERVICE (si aplica) ==========
  if (budgetData.service && budgetData.service.mozos > 0) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(...primaryColor)
    doc.text('👔 SERVICE', margin, yPosition)
    yPosition += 7

    autoTable(doc, {
      startY: yPosition,
      head: [['Description', 'Montant']],
      body: [
        [`${budgetData.service.mozos} serveur(s) x ${budgetData.service.hours}h`, ''],
        ['Total HT', `${budgetData.service.totalHT.toFixed(2)} €`],
        [`TVA (${budgetData.service.tvaPct}%)`, `${budgetData.service.tva.toFixed(2)} €`],
        ['Total TTC Service', `${budgetData.service.totalTTC.toFixed(2)} €`]
      ],
      theme: 'striped',
      headStyles: { fillColor: primaryColor, textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPosition = (doc as any).lastAutoTable.finalY + 10
  }

  // ========== TOTALES FINALES ==========
  doc.setFillColor(...primaryColor)
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('MONTANT GÉNÉRAL', margin + 5, yPosition + 7)

  doc.setFontSize(10)
  doc.text(`Total HT: ${budgetData.totals.totalHT.toFixed(2)} €`, margin + 5, yPosition + 13)
  doc.text(`TVA Totale: ${budgetData.totals.totalTVA.toFixed(2)} €`, margin + 5, yPosition + 18)

  doc.setFontSize(14)
  doc.text(`TOTAL TTC: ${budgetData.totals.totalTTC.toFixed(2)} €`, rightColumn, yPosition + 15)

  if (budgetData.totals.discount) {
    doc.setFontSize(9)
    doc.text(`(Remise ${budgetData.totals.discount.percentage}%: -${budgetData.totals.discount.amount.toFixed(2)} €)`, rightColumn, yPosition + 20)
  }

  yPosition += 30

  // ========== NOTAS ==========
  if (budgetData.notes) {
    doc.setTextColor(...darkGray)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    const splitNotes = doc.splitTextToSize(budgetData.notes, pageWidth - 2 * margin)
    doc.text(splitNotes, margin, yPosition)
    yPosition += splitNotes.length * 4 + 5
  }

  // ========== FOOTER ==========
  const footerY = pageHeight - 25
  doc.setDrawColor(...primaryColor)
  doc.line(margin, footerY, pageWidth - margin, footerY)

  doc.setTextColor(...darkGray)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('Fuegos d\'Azur - Service Traiteur', margin, footerY + 5)
  doc.text('📞 07 50 85 35 99 • 06 70 65 97 84', margin, footerY + 9)
  doc.text('📧 fuegosdazur@proton.me', margin, footerY + 13)

  doc.setFont('helvetica', 'italic')
  doc.text(`Devis valable jusqu'au: ${new Date(budgetData.validUntil).toLocaleDateString('fr-FR')}`, pageWidth - margin - 50, footerY + 5)
  doc.text(`Généré le: ${new Date(budgetData.generatedAt).toLocaleDateString('fr-FR')}`, pageWidth - margin - 50, footerY + 9)

  // Convertir a Blob
  const pdfBlob = doc.output('blob')
  return pdfBlob
}

/**
 * Genera el nombre del archivo PDF
 */
export function getBudgetPDFFilename(budgetData: BudgetData): string {
  const clientName = budgetData.clientInfo.name.replace(/\s+/g, '_')
  const date = new Date(budgetData.generatedAt).toISOString().split('T')[0]
  return `Devis_Fuegos_${clientName}_${date}.pdf`
}

