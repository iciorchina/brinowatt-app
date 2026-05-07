# Deploying Brinowatt to Vercel (free tier)

This deploys to a public URL like `brinowatt.vercel.app` in ~2 minutes.

---

## Prerequisites

You need accounts on these (both free, ~30 seconds each to create):
- **GitHub** — [github.com/signup](https://github.com/signup)
- **Vercel** — [vercel.com/signup](https://vercel.com/signup) — sign in with GitHub for one-click integration

You also need **Git installed locally**. Check with:
```bash
git --version
```
If missing: download from [git-scm.com/download/win](https://git-scm.com/download/win)

---

## Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `brinowatt` (or whatever you like)
3. Keep it **Public** (required for Vercel free tier; Private also works but check Vercel limits)
4. **Do NOT** check "Add README" / "Add .gitignore" / "Add license" — we already have these
5. Click **Create repository**
6. On the next page, GitHub shows you commands. **Copy the HTTPS URL** at the top (looks like `https://github.com/YOURNAME/brinowatt.git`)

---

## Step 2 — Push your code to GitHub

In a terminal in the project folder, run these commands one at a time. **Replace `YOUR_REPO_URL`** with the URL from step 1.

```bash
cd "C:\Users\Acasa\Desktop\Claude AI\energy-roi-app"

git init
git add .
git commit -m "Initial commit — Brinowatt ROI calculator"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

If asked for credentials, GitHub uses a **Personal Access Token** instead of your password. Quick guide:
- [Create one here](https://github.com/settings/tokens/new) → check the `repo` scope → Generate
- Paste the token when git asks for the password

---

## Step 3 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** → find your `brinowatt` repo → click **Import**
3. Vercel auto-detects **Next.js** — leave all settings as-is
4. *(Optional)* Add environment variables — for the basic deploy, skip this. You can add them later under **Settings → Environment Variables**
5. Click **Deploy**

Wait ~90 seconds. You'll get a live URL like `brinowatt-xyz.vercel.app`.

**Done.** Every future `git push` to `main` automatically redeploys.

---

## Step 4 — (Optional) Custom domain

If you own a domain like `brinowatt.com`:

1. Vercel project → **Settings** → **Domains** → add your domain
2. Vercel shows you DNS records to add at your registrar (GoDaddy, Namecheap, etc.)
3. Wait 5–60 minutes for DNS propagation
4. Vercel automatically issues a free SSL certificate

---

## Environment variables for production

The app works without any environment variables (leads are stored in-memory for demo).

When you want to wire up real lead delivery, add these in Vercel **Settings → Environment Variables**:

| Variable | What it does |
|---|---|
| `LEAD_STORAGE_SECRET` | Bearer token for the GET /api/leads admin endpoint |
| `CRM_WEBHOOK_URL` | POSTs every lead to your CRM endpoint |
| `CRM_API_KEY` | Bearer token sent with CRM webhook |
| `HUBSPOT_API_KEY` + `HUBSPOT_PORTAL_ID` + `HUBSPOT_FORM_ID` | HubSpot Forms integration |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |

After adding/changing env vars, redeploy from the Vercel dashboard (Deployments → ⋯ → Redeploy).

---

## Common deploy issues

**Build fails with TypeScript error**
Run `npm run build` locally first — same errors will surface but with better stack traces.

**`useSearchParams should be wrapped in a Suspense boundary`**
Already fixed in this codebase — `app/calculator/page.tsx` wraps the client component in `<Suspense>`.

**Hydration warnings from browser extensions**
Already suppressed via `suppressHydrationWarning` on `<body>` and FAQ buttons.

**404 on `/calculator/results`**
Make sure you ran the calculator first — results live in `sessionStorage` and require a complete calculation.

---

## After deploying — what to check

- [ ] Landing page loads at the live URL
- [ ] `/calculator` 6-step wizard works end-to-end
- [ ] Results page renders charts and KPIs
- [ ] Lead form submits successfully (check `/api/leads` GET endpoint with your `LEAD_STORAGE_SECRET`)
- [ ] `/privacy`, `/terms`, `/cookies`, `/thank-you` all render
- [ ] Mobile responsive (open in DevTools device mode)
