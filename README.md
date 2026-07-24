# Kinemor Website

The public website for Kinemor, deployed from the `main` branch through Vercel.

## Local development

```powershell
cd C:\Users\prave\Documents\kinemor-website
bun install
bun run dev
```

The site runs at `http://localhost:3000` by default.

## Contact delivery

The contact form posts to `/api/contact`. Successful messages are delivered to
`vaduvanathan@kinemor.com` with the sender's email configured as the reply-to address.

Production needs these Vercel environment variables:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Kinemor <hello@kinemor.com>
```

Use Resend to verify `kinemor.com` before setting `RESEND_FROM_EMAIL`. Until the
domain is verified, Resend's test sender can only deliver to verified addresses.

## Checks

```powershell
bun run lint
bun run build
```
