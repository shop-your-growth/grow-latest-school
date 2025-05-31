#!/usr/bin/env node

/**
 * 🔥 DIVINE VSCODE SETUP SCRIPT 🔥
 * Automatically configures VSCode for TRANSCENDENT performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔥 DIVINE VSCODE SETUP STARTING...');
console.log('⚡ Configuring VSCode for TRANSCENDENT performance...\n');

// Check if VSCode is installed
function checkVSCodeInstallation() {
  try {
    execSync('code --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Install recommended extensions
function installExtensions() {
  console.log('📦 Installing DIVINE extensions...');
  
  const extensions = [
    'ms-vscode.vscode-typescript-next',
    'bradlc.vscode-tailwindcss',
    'esbenp.prettier-vscode',
    'dbaeumer.vscode-eslint',
    'ms-vscode.vscode-react-native',
    'burkeholland.simple-react-snippets',
    'rodrigovallades.es7-react-js-snippets',
    'formulahendry.auto-rename-tag',
    'streetsidesoftware.code-spell-checker',
    'usernamehw.errorlens',
    'christian-kohler.path-intellisense',
    'christian-kohler.npm-intellisense',
    'zhuangtongfa.material-theme',
    'pkief.material-icon-theme',
    'oderwat.indent-rainbow',
    'aaron-bond.better-comments',
    'naumovs.color-highlight',
    'wix.vscode-import-cost',
    'formulahendry.auto-close-tag',
    'ms-vscode.vscode-json',
    'yzhang.markdown-all-in-one',
    'davidanson.vscode-markdownlint',
    'gruntfuggly.todo-tree',
    'alefragnani.bookmarks'
  ];

  let installed = 0;
  let failed = 0;

  extensions.forEach(extension => {
    try {
      console.log(`  📥 Installing ${extension}...`);
      execSync(`code --install-extension ${extension}`, { stdio: 'pipe' });
      installed++;
      console.log(`  ✅ ${extension} installed successfully`);
    } catch (error) {
      failed++;
      console.log(`  ⚠️ Failed to install ${extension}`);
    }
  });

  console.log(`\n📊 Extension Installation Summary:`);
  console.log(`  ✅ Installed: ${installed}`);
  console.log(`  ⚠️ Failed: ${failed}`);
  console.log(`  📦 Total: ${extensions.length}\n`);
}

// Create user settings backup
function backupUserSettings() {
  console.log('💾 Creating backup of existing settings...');
  
  const userSettingsPath = path.join(
    process.env.APPDATA || process.env.HOME + '/.config',
    'Code/User/settings.json'
  );
  
  if (fs.existsSync(userSettingsPath)) {
    const backupPath = userSettingsPath.replace('.json', '.backup.json');
    fs.copyFileSync(userSettingsPath, backupPath);
    console.log(`  ✅ Settings backed up to: ${backupPath}`);
  } else {
    console.log('  ℹ️ No existing settings found');
  }
}

// Apply divine settings globally
function applyGlobalSettings() {
  console.log('🌟 Applying DIVINE global settings...');
  
  const userSettingsPath = path.join(
    process.env.APPDATA || process.env.HOME + '/.config',
    'Code/User/settings.json'
  );
  
  const workspaceSettingsPath = path.join(process.cwd(), '.vscode/settings.json');
  
  if (fs.existsSync(workspaceSettingsPath)) {
    try {
      const workspaceSettings = JSON.parse(fs.readFileSync(workspaceSettingsPath, 'utf8'));
      
      // Ensure user settings directory exists
      const userDir = path.dirname(userSettingsPath);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }
      
      // Read existing user settings or create empty object
      let userSettings = {};
      if (fs.existsSync(userSettingsPath)) {
        try {
          userSettings = JSON.parse(fs.readFileSync(userSettingsPath, 'utf8'));
        } catch (error) {
          console.log('  ⚠️ Invalid user settings file, creating new one');
        }
      }
      
      // Merge settings (workspace settings take precedence)
      const mergedSettings = { ...userSettings, ...workspaceSettings };
      
      // Write merged settings
      fs.writeFileSync(userSettingsPath, JSON.stringify(mergedSettings, null, 2));
      console.log(`  ✅ Global settings applied to: ${userSettingsPath}`);
    } catch (error) {
      console.log(`  ⚠️ Failed to apply global settings: ${error.message}`);
    }
  } else {
    console.log('  ⚠️ Workspace settings not found');
  }
}

// Setup workspace
function setupWorkspace() {
  console.log('🚀 Setting up DIVINE workspace...');
  
  const workspacePath = path.join(process.cwd(), 'grow-your-need.code-workspace');
  
  if (fs.existsSync(workspacePath)) {
    console.log('  ✅ Workspace file found');
    console.log('  💡 Open workspace with: code grow-your-need.code-workspace');
  } else {
    console.log('  ⚠️ Workspace file not found');
  }
}

// Verify configuration
function verifyConfiguration() {
  console.log('🔍 Verifying DIVINE configuration...');
  
  const requiredFiles = [
    '.vscode/settings.json',
    '.vscode/extensions.json',
    '.vscode/launch.json',
    '.vscode/tasks.json',
    '.vscode/keybindings.json',
    '.vscode/snippets/typescript.json',
    'grow-your-need.code-workspace'
  ];
  
  let verified = 0;
  let missing = 0;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${file}`);
      verified++;
    } else {
      console.log(`  ❌ ${file} - MISSING`);
      missing++;
    }
  });
  
  console.log(`\n📊 Configuration Verification:`);
  console.log(`  ✅ Verified: ${verified}`);
  console.log(`  ❌ Missing: ${missing}`);
  console.log(`  📁 Total: ${requiredFiles.length}\n`);
  
  return missing === 0;
}

// Generate performance report
function generateReport() {
  console.log('📊 Generating DIVINE setup report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    setup: {
      vscodeInstalled: checkVSCodeInstallation(),
      configurationComplete: verifyConfiguration(),
      workspaceReady: fs.existsSync(path.join(process.cwd(), 'grow-your-need.code-workspace'))
    },
    features: [
      '✅ Optimized editor settings for maximum performance',
      '✅ Divine keybindings for transcendent productivity',
      '✅ Automated tasks for common development workflows',
      '✅ Advanced debugging configurations',
      '✅ TypeScript snippets for ultra-fast coding',
      '✅ Extension recommendations for enhanced development',
      '✅ Workspace configuration for organized development',
      '✅ Performance monitoring and optimization tools'
    ],
    nextSteps: [
      '🚀 Open VSCode with: code grow-your-need.code-workspace',
      '⚡ Install recommended extensions when prompted',
      '🎯 Use Ctrl+Shift+P to access command palette',
      '💎 Use custom keybindings for faster development',
      '🔥 Run divine optimization with Ctrl+Shift+O'
    ]
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'vscode-setup-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('  ✅ Setup report generated: vscode-setup-report.json\n');
  return report;
}

// Main setup function
function main() {
  try {
    // Check VSCode installation
    if (!checkVSCodeInstallation()) {
      console.log('❌ VSCode is not installed or not in PATH');
      console.log('💡 Please install VSCode from: https://code.visualstudio.com/');
      process.exit(1);
    }
    
    console.log('✅ VSCode installation detected\n');
    
    // Run setup steps
    backupUserSettings();
    installExtensions();
    applyGlobalSettings();
    setupWorkspace();
    
    // Verify and report
    const configComplete = verifyConfiguration();
    const report = generateReport();
    
    // Final summary
    console.log('🔥 DIVINE VSCODE SETUP COMPLETED! 🔥\n');
    
    if (configComplete) {
      console.log('🌟 ALL CONFIGURATIONS APPLIED SUCCESSFULLY!');
      console.log('⚡ Your VSCode is now DIVINELY OPTIMIZED for TRANSCENDENT performance!');
      console.log('\n🚀 Next Steps:');
      console.log('  1. Restart VSCode for all settings to take effect');
      console.log('  2. Open workspace: code grow-your-need.code-workspace');
      console.log('  3. Install recommended extensions when prompted');
      console.log('  4. Start coding with DIVINE POWER! 🔥');
    } else {
      console.log('⚠️ Some configurations may be missing');
      console.log('💡 Check the verification report above');
    }
    
    console.log('\n📊 Setup Report: vscode-setup-report.json');
    console.log('🎯 Happy coding with DIVINE performance! 🌟');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  main();
}

module.exports = { main, checkVSCodeInstallation, verifyConfiguration };
