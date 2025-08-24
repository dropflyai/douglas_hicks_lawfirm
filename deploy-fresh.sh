#!/bin/bash

# Fresh deployment script for Vercel
echo "🚨 DEPLOYING ENTERPRISE SYSTEM - FRESH DEPLOYMENT"

# Build locally first to verify
echo "Building locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful"
    
    # Deploy to new Vercel project
    echo "Deploying to fresh Vercel project..."
    npx vercel --prod --yes --name douglas-hicks-enterprise
    
    echo "🎯 Fresh deployment complete!"
    echo "New URL should be: https://douglas-hicks-enterprise.vercel.app"
else
    echo "❌ Local build failed - cannot deploy"
    exit 1
fi