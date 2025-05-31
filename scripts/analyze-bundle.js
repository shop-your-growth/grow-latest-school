#!/usr/bin/env node

/**
 * 🔥 DIVINE BUNDLE ANALYZER SCRIPT 🔥
 * Advanced bundle analysis for maximum optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔥 DIVINE BUNDLE ANALYSIS STARTING...');

// Check if webpack-bundle-analyzer is installed
function checkBundleAnalyzer() {
  try {
    require.resolve('webpack-bundle-analyzer');
    return true;
  } catch (error) {
    return false;
  }
}

// Install bundle analyzer if not present
if (!checkBundleAnalyzer()) {
  console.log('⚡ Installing webpack-bundle-analyzer...');
  try {
    execSync('npm install --save-dev webpack-bundle-analyzer', { stdio: 'inherit' });
    console.log('✅ Bundle analyzer installed');
  } catch (error) {
    console.error('❌ Failed to install bundle analyzer');
    process.exit(1);
  }
}

// Create enhanced Next.js config for analysis
console.log('⚡ Setting up bundle analysis...');

const analyzerConfig = `
// Bundle analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

module.exports = withBundleAnalyzer;
`;

// Update package.json with analysis scripts
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  pkg.scripts = {
    ...pkg.scripts,
    'analyze': 'ANALYZE=true npm run build',
    'analyze:server': 'BUNDLE_ANALYZE=server npm run build',
    'analyze:browser': 'BUNDLE_ANALYZE=browser npm run build',
    'size-check': 'npm run build && npx bundlesize'
  };
  
  // Add bundlesize configuration
  pkg.bundlesize = [
    {
      "path": ".next/static/js/*.js",
      "maxSize": "250kb",
      "compression": "gzip"
    },
    {
      "path": ".next/static/css/*.css",
      "maxSize": "50kb",
      "compression": "gzip"
    }
  ];
  
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  console.log('✅ Package.json updated with analysis scripts');
}

// Create bundle analysis report generator
const reportGenerator = `
const fs = require('fs');
const path = require('path');

function generateBundleReport() {
  const buildDir = path.join(process.cwd(), '.next');
  const staticDir = path.join(buildDir, 'static');
  
  if (!fs.existsSync(staticDir)) {
    console.log('❌ Build directory not found. Run npm run build first.');
    return;
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    analysis: {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      chunks: []
    }
  };
  
  // Analyze JS files
  const jsDir = path.join(staticDir, 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir);
    jsFiles.forEach(file => {
      const filePath = path.join(jsDir, file);
      const stats = fs.statSync(filePath);
      report.analysis.jsSize += stats.size;
      report.analysis.totalSize += stats.size;
      
      if (file.includes('chunk')) {
        report.analysis.chunks.push({
          name: file,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024 * 100) / 100
        });
      }
    });
  }
  
  // Analyze CSS files
  const cssDir = path.join(staticDir, 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir);
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file);
      const stats = fs.statSync(filePath);
      report.analysis.cssSize += stats.size;
      report.analysis.totalSize += stats.size;
    });
  }
  
  // Convert to KB
  report.analysis.totalSizeKB = Math.round(report.analysis.totalSize / 1024 * 100) / 100;
  report.analysis.jsSizeKB = Math.round(report.analysis.jsSize / 1024 * 100) / 100;
  report.analysis.cssSizeKB = Math.round(report.analysis.cssSize / 1024 * 100) / 100;
  
  // Performance recommendations
  report.recommendations = [];
  
  if (report.analysis.jsSizeKB > 250) {
    report.recommendations.push('🚨 JavaScript bundle is large. Consider code splitting.');
  }
  
  if (report.analysis.cssSizeKB > 50) {
    report.recommendations.push('🚨 CSS bundle is large. Consider purging unused styles.');
  }
  
  if (report.analysis.chunks.length > 10) {
    report.recommendations.push('⚠️ Many chunks detected. Review splitting strategy.');
  }
  
  if (report.recommendations.length === 0) {
    report.recommendations.push('✅ Bundle sizes look good!');
  }
  
  // Save report
  fs.writeFileSync(
    path.join(process.cwd(), 'bundle-analysis-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('📊 Bundle Analysis Report:');
  console.log(\`📦 Total Size: \${report.analysis.totalSizeKB} KB\`);
  console.log(\`🟨 JavaScript: \${report.analysis.jsSizeKB} KB\`);
  console.log(\`🟦 CSS: \${report.analysis.cssSizeKB} KB\`);
  console.log(\`📄 Chunks: \${report.analysis.chunks.length}\`);
  console.log('\\n📋 Recommendations:');
  report.recommendations.forEach(rec => console.log(rec));
}

if (require.main === module) {
  generateBundleReport();
}

module.exports = { generateBundleReport };
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'bundle-report.js'), reportGenerator);
console.log('✅ Bundle report generator created');

// Run initial analysis if build exists
console.log('⚡ Checking for existing build...');
const buildDir = path.join(process.cwd(), '.next');
if (fs.existsSync(buildDir)) {
  console.log('📊 Running bundle analysis...');
  try {
    execSync('node scripts/bundle-report.js', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Bundle analysis skipped');
  }
} else {
  console.log('💡 Run "npm run build" first to generate bundle analysis');
}

console.log('\n🔥 DIVINE BUNDLE ANALYZER SETUP COMPLETED! 🔥');
console.log('📊 Use "npm run analyze" to open visual bundle analyzer');
console.log('📋 Use "npm run size-check" to check bundle sizes');
console.log('⚡ Bundle analysis tools are now ready!');
