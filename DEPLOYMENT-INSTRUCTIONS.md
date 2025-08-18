# Deployment Instructions for LawFly Pro - Douglass Hicks Law

## GitHub Repository Setup

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `douglass-hicks-law`
3. Description: `LawFly Pro enterprise legal platform demo for Douglass Hicks Law Firm`
4. Set to **Public** (or Private if preferred)
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Code to GitHub
Run these commands in the `/Users/rioallen/Documents/douglass-hicks-law` directory:

```bash
# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/douglass-hicks-law.git

# Push to GitHub
git push -u origin main
```

## Vercel Deployment

### Step 3: Deploy to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Choose "Import Git Repository"
4. Select your `douglass-hicks-law` repository
5. Configure project:
   - **Project Name**: `douglass-hicks-law`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `.` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Click "Deploy"

### Step 4: Custom Domain (Optional)
After deployment, you can add a custom domain:
1. Go to Project Settings → Domains
2. Add domain like `lawfly-demo.yourdomain.com`
3. Configure DNS settings as instructed

## Project URLs
- **GitHub**: `https://github.com/YOUR_USERNAME/douglass-hicks-law`
- **Vercel**: `https://douglass-hicks-law.vercel.app` (or your custom domain)

## Expected Deployment Time
- GitHub push: ~30 seconds
- Vercel deployment: ~2-3 minutes
- Total time: ~3-4 minutes

## Verification Checklist
After deployment, verify:
- [ ] Site loads correctly at Vercel URL
- [ ] All sections render properly (Hero, Features, Capabilities, Testimonials)
- [ ] Mobile responsiveness works
- [ ] Navigation links function correctly
- [ ] All gradients and styling appear correctly
- [ ] Demo links work (https://lawflyai.com)

## Troubleshooting
If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify Next.js version compatibility
4. Check that build completes locally: `npm run build`

## Framework Template
Remember: The `lawfly-framework` directory contains the reusable template for future legal clients.

---
Generated with [Claude Code](https://claude.ai/code)