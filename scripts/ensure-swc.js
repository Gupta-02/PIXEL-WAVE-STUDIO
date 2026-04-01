const os = require('os');
const { execSync } = require('child_process');

const platform = os.platform();
const arch = os.arch();

let swcPackage = '';

if (platform === 'linux') {
  swcPackage = arch === 'arm64' 
    ? '@next/swc-linux-arm64-gnu@15.5.14' 
    : '@next/swc-linux-x64-gnu@15.5.14';
} else if (platform === 'darwin') {
  swcPackage = arch === 'arm64' 
    ? '@next/swc-darwin-arm64@15.5.14' 
    : '@next/swc-darwin-x64@15.5.14';
} else if (platform === 'win32') {
  swcPackage = arch === 'arm64' 
    ? '@next/swc-win32-arm64-msvc@15.5.14' 
    : '@next/swc-win32-x64-msvc@15.5.14';
}

if (swcPackage) {
  const swcModuleName = swcPackage.replace(/@\d+\.\d+\.\d+$/, '');
  try {
    require(swcModuleName);
    console.log(`✓ ${swcModuleName} already installed`);
  } catch (e) {
    console.log(`Installing ${swcPackage}...`);
    try {
      execSync(`npm install ${swcPackage} --no-save --no-package-lock --legacy-peer-deps`, {
        stdio: 'inherit'
      });
      console.log(`✓ Successfully installed ${swcPackage}`);
    } catch (err) {
      console.warn(`⚠ Failed to install ${swcPackage}, continuing anyway...`);
    }
  }
}

