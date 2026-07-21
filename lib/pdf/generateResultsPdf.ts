/**
 * Client-side PDF report generator (jsPDF + autotable, lazy-loaded).
 *
 * Every report opens with a large Brinoko brand block and the company's
 * contact details, followed by the localized analysis: KPI summary,
 * scenario comparison, per-technology detail tables, and a 20-year
 * cash-flow milestone table.
 *
 * A Unicode font (DejaVu Sans, served from /public/fonts) is embedded so
 * Romanian diacritics (ă â î ș ț) and German umlauts render correctly —
 * jsPDF's built-in Helvetica cannot encode them.
 */

import type { CalculationResults, CombinedResults, Scenario } from '@/types'
import type { CalcDictionary } from '@/lib/i18n/calc'
import {
  formatCurrency, formatKWh, formatKWp, formatPercent,
  formatYears, formatTonnesCO2, formatNumber,
} from '@/lib/utils/formatters'

// Verified company facts — mirror brinoko.ro; do not invent additions
const BRINOKO = {
  legalName: 'BRINOKO INDUSTRIES S.R.L.',
  emails: 'office@brinoko.ro  ·  contact@brinoko.ro',
  phone: '+40 746 987 892',
  web: 'brinoko.ro',
  anre: 'Atestat ANRE tip B nr. 21806 / 06.06.2024',
  area: 'România · Uniunea Europeană',
}

const INK: [number, number, number] = [15, 23, 42]     // slate-900
const GREEN: [number, number, number] = [22, 163, 74]  // brand-600
const GRAY: [number, number, number] = [100, 116, 139] // slate-500
const LIGHT: [number, number, number] = [241, 245, 249] // slate-100

const PAGE_W = 210
const MARGIN = 15
const CONTENT_W = PAGE_W - MARGIN * 2

async function fetchAsBase64(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`)
  const buf = new Uint8Array(await res.arrayBuffer())
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < buf.length; i += chunk) {
    binary += String.fromCharCode(...buf.subarray(i, i + chunk))
  }
  return btoa(binary)
}

async function loadImage(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
    img.onerror = reject
    img.src = dataUrl
  })
}

export async function generateResultsPdf(
  fullResults: CalculationResults,
  activeScenario: Scenario,
  ct: CalcDictionary,
  lang: string
): Promise<number> {
  const { default: JsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new JsPDF({ unit: 'mm', format: 'a4' })

  // ── Unicode font (diacritics) ──────────────────────────────────────────
  let font = 'helvetica'
  try {
    const [reg, bold] = await Promise.all([
      fetchAsBase64('/fonts/DejaVuSans.ttf'),
      fetchAsBase64('/fonts/DejaVuSans-Bold.ttf'),
    ])
    doc.addFileToVFS('DejaVuSans.ttf', reg)
    doc.addFont('DejaVuSans.ttf', 'DejaVu', 'normal')
    doc.addFileToVFS('DejaVuSans-Bold.ttf', bold)
    doc.addFont('DejaVuSans-Bold.ttf', 'DejaVu', 'bold')
    font = 'DejaVu'
  } catch {
    // Fallback: built-in Helvetica (degraded diacritics, but never a crash)
  }

  const scenarioResults: CombinedResults =
    activeScenario === 'standard' ? fullResults.combined : fullResults.scenarios[activeScenario]
  const formData = fullResults.formData ?? {}
  const yearsU = ct.units.years
  const perYr = ct.units.perYr

  // ── Page 1 header: huge Brinoko + contacts ────────────────────────────
  let logoBottom = 34
  try {
    const logoB64 = await fetchAsBase64('/brand/brinoko-logo.png')
    const dataUrl = `data:image/png;base64,${logoB64}`
    const dims = await loadImage(dataUrl)
    const drawH = 24 // huge: ~1/12 of page height
    const drawW = Math.min((dims.w / dims.h) * drawH, 95)
    doc.addImage(dataUrl, 'PNG', MARGIN, 12, drawW, drawH)
    logoBottom = 12 + drawH
  } catch {
    doc.setFont(font, 'bold')
    doc.setFontSize(38)
    doc.setTextColor(...INK)
    doc.text('BRINOKO', MARGIN, 30)
    logoBottom = 34
  }

  // Contact block, right-aligned
  const rightX = PAGE_W - MARGIN
  doc.setTextColor(...INK)
  doc.setFont(font, 'bold')
  doc.setFontSize(10)
  doc.text(BRINOKO.legalName, rightX, 15, { align: 'right' })
  doc.setFont(font, 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...GRAY)
  doc.text(BRINOKO.emails, rightX, 20, { align: 'right' })
  doc.text(`${BRINOKO.phone}  ·  ${BRINOKO.web}`, rightX, 24.5, { align: 'right' })
  doc.text(BRINOKO.area, rightX, 29, { align: 'right' })
  doc.text(BRINOKO.anre, rightX, 33.5, { align: 'right' })

  // Divider + powered-by
  const dividerY = Math.max(logoBottom + 3, 39)
  doc.setDrawColor(...GREEN)
  doc.setLineWidth(1)
  doc.line(MARGIN, dividerY, PAGE_W - MARGIN, dividerY)
  doc.setFontSize(7.5)
  doc.setTextColor(...GRAY)
  doc.text(ct.pdf.generatedBy, MARGIN, dividerY + 4.5)

  // ── Title + meta ──────────────────────────────────────────────────────
  let y = dividerY + 14
  doc.setFont(font, 'bold')
  doc.setFontSize(17)
  doc.setTextColor(...INK)
  doc.text(ct.results.header.title, MARGIN, y)
  y += 6.5

  const solutionKey = (formData.selectedSolution ?? 'pv') as keyof typeof ct.results.solutionLabels
  const dateStr = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : lang)
  const metaParts = [
    formData.companyName,
    ct.results.solutionLabels[solutionKey],
    formData.country ? (ct.countries[formData.country] ?? formData.country) : undefined,
    `${ct.pdf.date}: ${dateStr}`,
  ].filter(Boolean)
  doc.setFont(font, 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...GRAY)
  doc.text(metaParts.join('  ·  '), MARGIN, y)
  y += 7

  // ── KPI boxes ─────────────────────────────────────────────────────────
  const kpis = [
    { label: ct.results.header.totalInvestment, value: formatCurrency(scenarioResults.totalCapexEUR) },
    { label: ct.results.header.annualSavings, value: `${formatCurrency(scenarioResults.totalAnnualSavings)}${perYr}` },
    { label: ct.results.header.paybackPeriod, value: formatYears(scenarioResults.totalPaybackYears, yearsU) },
    { label: ct.results.header.co2Reduction, value: formatTonnesCO2(scenarioResults.totalCo2ReductionTonnes, ct.units.tCo2) },
  ]
  const boxW = (CONTENT_W - 3 * 4) / 4
  const boxH = 20
  kpis.forEach((kpi, i) => {
    const x = MARGIN + i * (boxW + 4)
    doc.setFillColor(...LIGHT)
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(x, y, boxW, boxH, 2, 2, 'FD')
    doc.setFont(font, 'bold')
    doc.setFontSize(11.5)
    doc.setTextColor(...GREEN)
    doc.text(kpi.value, x + 3, y + 9)
    doc.setFont(font, 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...GRAY)
    doc.text(doc.splitTextToSize(kpi.label, boxW - 6), x + 3, y + 14)
  })
  y += boxH + 8

  const tableBase = {
    margin: { left: MARGIN, right: MARGIN },
    styles: { font, fontSize: 8.5, textColor: INK, cellPadding: 1.8 },
    headStyles: { fillColor: INK, textColor: 255 as const, font, fontStyle: 'bold' as const },
    alternateRowStyles: { fillColor: [248, 250, 252] as [number, number, number] },
  }

  // ── Scenario comparison ───────────────────────────────────────────────
  const sc = ct.results.scenarios
  const scenAll = {
    conservative: fullResults.scenarios.conservative,
    standard: fullResults.scenarios.standard,
    optimistic: fullResults.scenarios.optimistic,
  }
  autoTable(doc, {
    ...tableBase,
    startY: y,
    head: [[ct.pdf.scenarioComparison, sc.conservative.label, sc.standard.label, sc.optimistic.label]],
    body: [
      [ct.results.header.annualSavings, ...Object.values(scenAll).map(s => `${formatCurrency(s.totalAnnualSavings)}${perYr}`)],
      [ct.results.header.paybackPeriod, ...Object.values(scenAll).map(s => formatYears(s.totalPaybackYears, yearsU))],
      [ct.results.header.totalInvestment, ...Object.values(scenAll).map(s => formatCurrency(s.totalCapexEUR))],
      [ct.results.kpi.roi10, ...Object.values(scenAll).map(s => formatPercent(s.roi10Years))],
      [ct.results.kpi.npv, ...Object.values(scenAll).map(s => formatCurrency(s.npv))],
    ],
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 8

  // ── Per-technology detail tables ──────────────────────────────────────
  const s = ct.results.system
  const techTables: { title: string; rows: [string, string][] }[] = []
  if (fullResults.pv) {
    const p = fullResults.pv
    techTables.push({
      title: s.pvTitle,
      rows: [
        [s.systemSize, formatKWp(p.systemSizeKWp)],
        [s.annualProduction, formatKWh(p.annualProductionKWh)],
        [s.selfConsumption, formatPercent(p.selfConsumptionRate)],
        [s.gridExport, formatKWh(p.gridExportKWh) + perYr],
        [s.gridExportRevenue, formatCurrency(p.gridExportRevenue) + perYr],
        [s.annualBenefit, formatCurrency(p.totalAnnualBenefit) + perYr],
        [s.capex, formatCurrency(p.capexEUR)],
        [s.payback, formatYears(p.paybackYears, yearsU)],
        [s.co2, formatTonnesCO2(p.co2ReductionTonnes, ct.units.tCo2)],
      ],
    })
  }
  if (fullResults.bess) {
    const b = fullResults.bess
    techTables.push({
      title: s.bessTitle,
      rows: [
        [s.storageCapacity, `${formatNumber(b.storageSizeKWh, 0)} kWh`],
        [s.powerRating, `${formatNumber(b.powerKW, 0)} kW`],
        [s.scBoost, `+${formatPercent(b.selfConsumptionIncrease)}`],
        [s.additionalSelfUse, formatKWh(b.additionalSelfConsumptionKWh) + perYr],
        [s.peakShavingSavings, formatCurrency(b.peakShavingSavings) + perYr],
        [s.annualSavings, formatCurrency(b.annualSavings) + perYr],
        [s.capex, formatCurrency(b.capexEUR)],
        [s.payback, formatYears(b.paybackYears, yearsU)],
      ],
    })
  }
  if (fullResults.heatPump) {
    const h = fullResults.heatPump
    techTables.push({
      title: s.hpTitle,
      rows: [
        [s.systemSize, `${h.heatPumpSizeKW} kW`],
        [s.copEfficiency, `${h.cop.toFixed(1)}×`],
        [s.hpElectricityUse, formatKWh(h.annualHeatPumpElectricityKWh) + perYr],
        ...(h.solarCoveredKWh > 0
          ? [[s.solarCovered, formatKWh(h.solarCoveredKWh) + perYr] as [string, string]]
          : []),
        [s.currentHeatingCost, formatCurrency(h.annualCurrentEnergyCost) + perYr],
        [s.hpEnergyCost, formatCurrency(h.annualHeatPumpEnergyCost) + perYr],
        [s.annualSavings, formatCurrency(h.annualSavings) + perYr],
        [s.capex, formatCurrency(h.capexEUR)],
        [s.payback, formatYears(h.paybackYears, yearsU)],
        [s.co2, formatTonnesCO2(h.co2ReductionTonnes, ct.units.tCo2)],
      ],
    })
  }
  for (const tech of techTables) {
    autoTable(doc, {
      ...tableBase,
      startY: y,
      head: [[tech.title, '']],
      body: tech.rows,
      columnStyles: { 0: { cellWidth: 90 }, 1: { fontStyle: 'bold' as const } },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 6
  }

  // ── Cash-flow milestones ──────────────────────────────────────────────
  const cf = scenarioResults.cumulativeCashFlow
  const milestoneYears = [1, 5, 10, 15, 20]
  autoTable(doc, {
    ...tableBase,
    startY: y,
    head: [[ct.results.cashflow.title, ...milestoneYears.map(n => `${ct.results.cashflow.year} ${n}`)]],
    body: [
      [ct.results.cashflow.cumulativeSavings, ...milestoneYears.map(n => formatCurrency(cf[n - 1]?.cumulativeSavings ?? 0))],
      [ct.results.cashflow.netCashPosition, ...milestoneYears.map(n => formatCurrency(cf[n - 1]?.cumulativeCashFlow ?? 0))],
    ],
  })

  // ── Footer on every page: disclaimer + page numbers + contact line ────
  const pageCount = doc.getNumberOfPages()
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p)
    doc.setFont(font, 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(...GRAY)
    const disclaimer = doc.splitTextToSize(ct.results.disclaimerFooter.replace('⚠ ', ''), CONTENT_W)
    doc.text(disclaimer, MARGIN, 283)
    doc.setFontSize(7.5)
    doc.text(`${BRINOKO.legalName}  ·  ${BRINOKO.phone}  ·  ${BRINOKO.web}`, MARGIN, 279)
    doc.text(`${ct.pdf.page} ${p}/${pageCount}`, rightX, 279, { align: 'right' })
  }

  const fileDate = new Date().toISOString().slice(0, 10)
  doc.save(`${ct.pdf.fileName}-${fileDate}.pdf`)
  return doc.output('arraybuffer').byteLength
}
