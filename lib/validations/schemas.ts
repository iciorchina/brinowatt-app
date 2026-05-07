import { z } from 'zod'

export const locationSchema = z.object({
  country: z.string().min(1, 'Please select your country'),
  city: z.string().min(2, 'Please enter your city'),
  companyName: z.string().min(2, 'Please enter your company name'),
  businessSector: z.string().min(1, 'Please select your sector'),
  buildingSize: z.coerce.number().min(10, 'Min 10 m²').max(500000, 'Max 500,000 m²'),
})

export const energySchema = z.object({
  annualElectricityConsumption: z.coerce.number().min(1000, 'Min 1,000 kWh/year').max(100_000_000),
  monthlyElectricityBill: z.coerce.number().min(10, 'Please enter a valid amount'),
  electricityTariff: z.coerce.number().min(0.01, 'Min 0.01 EUR/kWh').max(2, 'Max 2 EUR/kWh'),
  operatingHoursPerDay: z.coerce.number().min(1).max(24),
})

export const pvConfigSchema = z.object({
  roofType: z.enum(['flat', 'pitched', 'ground_mounted']),
  availableRoofArea: z.coerce.number().min(10, 'Min 10 m²').max(100000),
  selfConsumptionPriority: z.boolean().default(true),
  gridExportAllowed: z.boolean().default(true),
})

export const bessConfigSchema = z.object({
  peakShavingInterest: z.boolean().default(false),
  backupPowerInterest: z.boolean().default(false),
  preferredStorageHours: z.coerce.number().min(1).max(24).default(4),
})

export const heatPumpConfigSchema = z.object({
  currentHeatingType: z.enum(['gas', 'oil', 'electric', 'district', 'biomass', 'other']),
  annualHeatingCost: z.coerce.number().min(0),
  annualHeatingDemand: z.coerce.number().min(0),
})

export const budgetSchema = z.object({
  budgetRange: z.string().optional(),
  financingPreference: z.enum(['cash', 'loan', 'leasing', 'ppa', 'undecided']).default('undecided'),
})

export const contactSchema = z.object({
  contactName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  contactConsent: z.boolean().refine(v => v === true, { message: 'Please consent to be contacted' }),
  gdprConsent: z.boolean().refine(v => v === true, { message: 'Please accept the privacy policy' }),
})
