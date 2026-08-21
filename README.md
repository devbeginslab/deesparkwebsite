# Deespark Wellness

This is a static React and Vite storefront prepared for **GitHub Pages**. The deployment workflow publishes the website whenever a change is pushed to the `main` branch.

## Publish on GitHub Pages

| Step | What to do |
| --- | --- |
| 1 | Create a new GitHub repository, then upload or push this project to its `main` branch. |
| 2 | Add the nine image files listed in [`client/public/assets/README.md`](client/public/assets/README.md) to `client/public/assets/`. Keep the supplied product, glasses, and logo images unchanged. |
| 3 | In the repository, open **Settings → Pages** and select **GitHub Actions** as the publishing source. |
| 4 | Push to `main`. The **Deploy Deespark Wellness to GitHub Pages** workflow builds and publishes the site automatically. |

The site will be available at `https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`. The GitHub build uses relative paths, so it works for both a personal Pages site and a repository Pages site.

## Local commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the local development server. |
| `pnpm check` | Run the TypeScript validation. |
| `pnpm build` | Create the managed production build. |
| `pnpm build:github` | Create the static GitHub Pages build in `dist/public`. |

The order buttons are direct WhatsApp links with product-specific messages. Update the product records in `client/src/pages/Home.tsx` if product names, messages, or phone numbers change.
