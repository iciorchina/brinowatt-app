# EnergyROI — Energy Investment Calculator for European Businesses

A production-ready, conversion-optimised B2B web application that lets European SMEs calculate the financial return of investing in **solar PV**, **battery storage (BESS)**, and **heat pumps** — and captures qualified leads for tailored energy offers.

---

## Overview

EnergyROI combines a polished marketing landing page with a guided multi-step calculator and a results dashboard. The business goal is dual:

1. **Provide genuine value** — accurate, country-specific ROI estimates in under 5 minutes
2. **Generate qualified leads** — capture contact details and project context for follow-up by energy specialists

The app is Europe-first: it ships with country-specific electricity prices, solar irradiance data, installation costs, and CO₂ grid factors for 13 European markets.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Deployment | Vercel (recommended) |
| Lead storage (dev) | In-memory (replace with DB) |

---

## Quick Start

```bash
# 1. Navigate to the project
cd energy-roi-app

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
energy-roi-app/
├── app/
│   ├── layout.tsx                  # Root layout (Header, Footer, CTA)
│   ├── page.tsx                    # Landing page
│   ├── globals.css                 # Global styles + Tailwind layers
│   ├── calculator/
│   │   ├── layout.tsx              # Calculator section metadata
│   │   ├── page.tsx                # Wizard controller (6-step form)
│   │   └── results/
│   │       └── page.tsx            # Results dashboard
│   ├── thank-you/
│   │   └── page.tsx                # Post-submission confirmation
│   ├── privacy/
│   │   └── page.tsx                # GDPR privacy policy (placeholder)
│   └── api/
│       └── leads/
│           └── route.ts            # Lead submission API + admin GET
│
├── components/
│   ├── landing/                    # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   ├── calculator/                 # Multi-step form components
│   │   ├── CalculatorLayout.tsx    # Progress bar + step wrapper
│   │   └── steps/
│   │       ├── SolutionStep.tsx    # Step 1: choose solution type
│   │       ├── LocationStep.tsx    # Step 2: company & location
│   │       ├── EnergyStep.tsx      # Step 3: consumption data
│   │       ├── ConfigStep.tsx      # Step 4: system-specific config
│   │       ├── BudgetStep.tsx      # Step 5: budget & financing
│   │       └── ContactStep.tsx     # Step 6: lead capture
│   ├── results/                    # Results dashboard components
│   │   ├── ResultsDashboard.tsx    # Main controller
│   │   ├── ResultsHeader.tsx       # Top KPI summary bar
│   │   ├── ScenarioSwitcher.tsx    # Conservative/Standard/Optimistic tabs
│   │   ├── CashFlowChart.tsx       # 20-year Recharts area chart
│   │   ├── SavingsBreakdownChart.tsx # Recharts pie/donut chart
│   │   ├── KPICards.tsx            # 6-metric KPI grid
│   │   ├── SystemSummaryCards.tsx  # Per-technology detail cards
│   │   ├── ROITimeline.tsx         # ROI at 5/10/15/20 year milestones
│   │   └── LeadCapturePanel.tsx    # CTA + inline lead form
│   └── shared/                     # Site-wide components
│       ├── Header.tsx              # Sticky nav
│       ├── Footer.tsx              # Full-width footer
│       ├── StickyConsultCTA.tsx    # Floating "Get Free Quote" button
│       └── CookieBanner.tsx        # GDPR cookie consent bar
│
├── lib/
│   ├── calculations/               # Modular calculation engine
│   │   ├── pvCalculations.ts       # Solar PV logic
│   │   ├── bessCalculations.ts     # Battery storage logic
│   │   ├── heatPumpCalculations.ts # Heat pump logic
│   │   ├── combinedCalculations.ts # Orchestrator + scenarios
│   │   └── index.ts                # Barrel exports
│   ├── config/
│   │   ├── assumptions.ts          # ← EDIT THIS to adjust all formulas
│   │   └── countries.ts            # Country-specific parameters
│   ├── services/
│   │   └── leadService.ts          # CRM integration stubs
│   ├── utils/
│   │   ├── formatters.ts           # Currency, kWh, % formatters
│   │   └── localStorage.ts         # Form persistence helpers
│   └── validations/
│       └── schemas.ts              # Zod validation schemas
│
├── types/
│   └── index.ts                    # All shared TypeScript types
│
├── .env.example                    # Environment variable template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Calculator Logic

### Adjusting Assumptions

All calculation constants live in a single file:

```
lib/config/assumptions.ts
```

Key values you'll want to review before going live:

| Assumption | Current Value | Notes |
|---|---|---|
| `pvDefaultInstallCostPerKWp` | €1,100/kWp | EU SME average 2024 |
| `pvSelfConsumptionBasePercent` | 35% | Without battery |
| `pvSelfConsumptionWithBessPercent` | 70% | With battery |
| `bessDefaultCostPerKWh` | €600/kWh | LFP installed 2024 |
| `hpCOPDefault` | 3.5 | Air-to-water, temperate |
| `hpDefaultInstallCostPerKW` | €800/kW | Commercial grade |
| `electricityPriceInflationPercent` | 3%/yr | Annual price escalation |
| `discountRatePercent` | 5% | For NPV calculation |

### Scenario Multipliers

The three scenarios apply multipliers to base CAPEX and savings:

```typescript
conservative: { capex: 1.15, savings: 0.80 }  // more cautious
standard:     { capex: 1.00, savings: 1.00 }  // base case
optimistic:   { capex: 0.90, savings: 1.20 }  // best case
```

### Adding a New Country

Open `lib/config/countries.ts` and add an entry to the `COUNTRIES` array:

```typescript
{
  code: 'RO',
  name: 'Romania',
  flag: '🇷🇴',
  electricityPrice: 0.18,      // EUR/kWh SME tariff
  solarIrradiance: 1350,       // kWh/kWp/year (from PVGIS)
  feedInTariff: 0.04,
  pvInstallationCostPerKWp: 900,
  bessCostPerKWh: 520,
  heatPumpCostPerKW: 720,
  currency: 'RON',
  vatRate: 19,
  co2GridFactor: 0.27,
  gasPricePerKWh: 0.065,
  oilPricePerKWh: 0.080,
}
```

The calculator picks it up automatically.

---

## Lead Capture & CRM Integrations

### How It Works

1. User completes the 6-step form → clicks "Get My Results"
2. Results are calculated client-side and stored in `sessionStorage`
3. After viewing results, user submits the **lead form** (name, email, phone, consent)
4. A `POST /api/leads` request is fired with the full form data + results
5. The API stores the lead and fires integration stubs in parallel

### Connecting HubSpot

1. Set environment variables in `.env.local`:
   ```
   HUBSPOT_API_KEY=your_api_key
   HUBSPOT_PORTAL_ID=your_portal_id
   HUBSPOT_FORM_ID=your_form_guid
   ```
2. Open `lib/services/leadService.ts` → `submitToHubSpot()`
3. Implement the HubSpot Forms v3 API call:
   ```
   POST https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formId
   ```

### Connecting Google Sheets

1. Set `GOOGLE_SHEETS_SPREADSHEET_ID` + service account credentials
2. Implement `submitToGoogleSheets()` in `leadService.ts` using the Google Sheets API
3. Map the lead fields to spreadsheet columns as needed

### Generic CRM Webhook

Set `CRM_WEBHOOK_URL` and `CRM_API_KEY`. The app will POST the full lead payload (JSON) to your endpoint.

### Lead Data Schema

```json
{
  "formData": {
    "selectedSolution": "pv_bess",
    "country": "DE",
    "city": "Munich",
    "companyName": "Acme GmbH",
    "email": "cfo@acme.de",
    "phone": "+49 89 1234567",
    "annualElectricityConsumption": 85000,
    "electricityTariff": 0.31,
    "gdprConsent": true,
    "contactConsent": true
  },
  "results": {
    "combined": {
      "totalCapexEUR": 98500,
      "totalAnnualSavings": 14200,
      "totalPaybackYears": 6.9,
      "roi10Years": 44
    }
  },
  "metadata": {
    "submittedAt": "2024-04-01T14:32:00Z",
    "utmSource": "google",
    "utmCampaign": "solar-smb-de"
  }
}
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Your domain (for OG tags) |
| `LEAD_STORAGE_SECRET` | Recommended | Bearer token for GET /api/leads |
| `HUBSPOT_API_KEY` | Optional | HubSpot private app token |
| `HUBSPOT_PORTAL_ID` | Optional | HubSpot portal ID |
| `HUBSPOT_FORM_ID` | Optional | HubSpot form GUID |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Optional | Target spreadsheet |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Optional | Service account email |
| `GOOGLE_PRIVATE_KEY` | Optional | Service account private key |
| `CRM_WEBHOOK_URL` | Optional | Generic CRM POST endpoint |
| `CRM_API_KEY` | Optional | Bearer token for CRM |
| `SENDGRID_API_KEY` | Optional | For email automation |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 |

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production env vars via Vercel dashboard or CLI:
vercel env add LEAD_STORAGE_SECRET production
```

**Important for production:**
- Replace the in-memory lead store in `app/api/leads/route.ts` with a real database (Postgres via Supabase, PlanetScale, or Neon recommended)
- Set all required environment variables in your Vercel project settings
- Enable Vercel Analytics for performance monitoring

---

## GDPR Notes

The app implements these GDPR-aligned practices:

- **Explicit consent:** Two separate checkboxes — one for contact consent, one for privacy policy acceptance
- **Consent timestamps:** Recorded server-side with each lead
- **Data minimisation:** Only collects data necessary for the energy analysis and offer
- **Opt-in only:** No pre-checked boxes; no implicit consent
- **Withdrawal:** Users can request deletion via the email in the privacy policy
- **Privacy policy:** Placeholder at `/privacy` — replace with a legally reviewed policy

**Replace before launch:**
- Update `/app/privacy/page.tsx` with your real privacy policy
- Add your real company name and DPO contact details
- Review cookie categories and update the banner accordingly

---

## License

MIT — free to use, modify, and deploy. Attribution appreciated but not required.

---

*Built with Next.js 14 · Tailwind CSS · TypeScript · Recharts*
