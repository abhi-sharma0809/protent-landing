<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1h-3_aWDxwtajt7X8CH900XQ5qply9Qc4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Get Started form and email (Resend)

The form sends **one email only** — to **srihan@protent.ai**, **abhi@protent.ai**, and **hari@protent.ai** — with the submitter’s agency, name, email, and phone. The person who filled out the form is never emailed.

To send to those addresses (instead of only to the Resend account owner), you must:

1. **Verify your domain** (e.g. protent.ai) at [resend.com/domains](https://resend.com/domains).
2. **Set the sender address** to an email on that domain. In `.env` (local) and Vercel Environment Variables (production), add:
   ```bash
   FROM_EMAIL=form@protent.ai
   ```
   (or `notifications@protent.ai`, etc.). If you don’t set `FROM_EMAIL`, Resend uses `onboarding@resend.dev`, which can only send to your own Resend account email.

- **Local:** `RESEND_API_KEY` and `FROM_EMAIL` in `.env` or `.env.local`; run `npm run dev`.
- **Production (Vercel):** Add `RESEND_API_KEY` and `FROM_EMAIL` in the project’s Environment Variables. The `.env` file is not deployed.
