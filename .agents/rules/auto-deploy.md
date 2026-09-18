# Automatic Vercel Deployment Rule

Whenever you make, complete, or finalize any modifications, features, fixes, or updates to this codebase:
1. Verify the project builds cleanly by running `npm run build`.
2. Automatically deploy the updated version to Vercel production using:
   ```powershell
   npx vercel --prod --yes
   ```
3. Report the latest deployment URL (`https://kalaikahbirthday.vercel.app` or `https://kalai-kah-birthday.vercel.app`) and status to the user.
