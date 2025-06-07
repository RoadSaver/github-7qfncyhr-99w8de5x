# 🚀 RoadSaver Multi-Repository GitHub Setup Guide

## 📋 Prerequisites
- GitHub account
- Git installed on your computer
- Node.js and npm installed

## 🏗️ Step 1: Create GitHub Repositories

### Create 4 new repositories on GitHub:
1. **roadsaver-user** - User/Customer application
2. **roadsaver-employee** - Employee/Technician dashboard  
3. **roadsaver-admin** - Administrative panel
4. **roadsaver-shared** - Shared components and utilities

### Repository Settings:
- ✅ Make them **Public** or **Private** (your choice)
- ✅ Initialize with README
- ✅ Add .gitignore template: **Node**
- ✅ Choose license: **MIT** (recommended)

## 📁 Step 2: Local Setup Commands

Run these commands in your terminal:

```bash
# Create main directory
mkdir roadsaver-multi-repo
cd roadsaver-multi-repo

# Clone all repositories
git clone https://github.com/YOUR_USERNAME/roadsaver-shared.git
git clone https://github.com/YOUR_USERNAME/roadsaver-user.git
git clone https://github.com/YOUR_USERNAME/roadsaver-employee.git
git clone https://github.com/YOUR_USERNAME/roadsaver-admin.git

# Setup shared package first
cd roadsaver-shared
npm install
npm run build
npm link

# Setup user app
cd ../roadsaver-user
npm install
npm link @roadsaver/shared
npm run dev

# Setup employee app (in new terminal)
cd ../roadsaver-employee
npm install
npm link @roadsaver/shared
npm run dev

# Setup admin app (in new terminal)
cd ../roadsaver-admin
npm install
npm link @roadsaver/shared
npm run dev
```

## 🔧 Step 3: Environment Setup

### Create `.env` files in each repository:

**roadsaver-shared/.env:**
```env
VITE_SUPABASE_URL=https://qigmqsyfwsyqhnchlein.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ21xc3lmd3N5cWhuY2hsZWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3Mzk0MjMsImV4cCI6MjA2NDMxNTQyM30.dQtP3s3cXWyRq5AUS9ef_DjnEbJ3RBElDxRLOU8nnaw
```

**Copy the same `.env` to all other repositories.**

## 🚀 Step 4: Development Workflow

### Daily Development:
```bash
# Start all apps simultaneously
npm run dev:all

# Or start individually:
# Terminal 1: User app
cd roadsaver-user && npm run dev

# Terminal 2: Employee app  
cd roadsaver-employee && npm run dev

# Terminal 3: Admin app
cd roadsaver-admin && npm run dev
```

### URLs:
- **User App**: http://localhost:3001
- **Employee App**: http://localhost:3002  
- **Admin App**: http://localhost:3003

## 📦 Step 5: Deployment Options

### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy each app
cd roadsaver-user && vercel
cd roadsaver-employee && vercel  
cd roadsaver-admin && vercel
```

### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy each app
cd roadsaver-user && netlify deploy --prod
cd roadsaver-employee && netlify deploy --prod
cd roadsaver-admin && netlify deploy --prod
```

### Option C: Docker (All apps together)
```bash
# Build and run all apps
docker-compose up --build

# Access apps:
# User: http://localhost:3001
# Employee: http://localhost:3002
# Admin: http://localhost:3003
```

## 🔄 Step 6: Git Workflow

### Making Changes:
```bash
# 1. Update shared components (if needed)
cd roadsaver-shared
# Make changes...
git add .
git commit -m "Update shared components"
git push origin main
npm version patch
npm run build

# 2. Update individual apps
cd ../roadsaver-user
# Make changes...
git add .
git commit -m "Add new user feature"
git push origin main

# 3. Update other apps similarly
```

### Syncing Shared Changes:
```bash
# In each app directory when shared package updates
npm update @roadsaver/shared
```

## 🛠️ Step 7: CI/CD Setup (Optional)

### GitHub Actions for each repository:

**`.github/workflows/deploy.yml`:**
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🔐 Step 8: Security & Environment Variables

### GitHub Secrets to add:
- `VERCEL_TOKEN`
- `SUPABASE_URL` 
- `SUPABASE_ANON_KEY`
- `ORG_ID`
- `PROJECT_ID`

## 📊 Step 9: Monitoring & Analytics

### Add to each app:
```bash
# Error tracking
npm install @sentry/react

# Analytics  
npm install @vercel/analytics

# Performance monitoring
npm install @vercel/speed-insights
```

## 🎯 Benefits Achieved

✅ **Independent Scaling**: Each app scales separately  
✅ **Team Collaboration**: Different teams can work on different repos  
✅ **Security Isolation**: Admin functions completely separated  
✅ **Faster Deployments**: Deploy only what changed  
✅ **Better Organization**: Clear separation of concerns  
✅ **Shared Components**: No code duplication  
✅ **Unified Database**: All apps connect to same Supabase instance  

## 🆘 Troubleshooting

### Common Issues:

**Shared package not found:**
```bash
cd roadsaver-shared
npm link
cd ../roadsaver-user  
npm link @roadsaver/shared
```

**Port conflicts:**
```bash
# Kill processes on ports
npx kill-port 3001 3002 3003
```

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Ensure Supabase connection is working
4. Check that shared package is properly linked

---

**🎉 Congratulations!** You now have a professional multi-repository architecture for RoadSaver that maintains all functionality while providing excellent scalability and maintainability!