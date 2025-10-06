const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively find all JavaScript and JSX files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findFiles(filePath, fileList);
    } else if (
      (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) &&
      !filePath.includes('node_modules')
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to update API endpoint URLs in a file
function updateApiUrls(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(/localhost:5000/g, 'localhost:5000');
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated API URLs in ${filePath}`);
  }
}

// Main function
function main() {
  const frontendDir = path.join(__dirname);
  const files = findFiles(frontendDir);
  
  console.log(`Found ${files.length} files to check for API URLs`);
  
  files.forEach(file => {
    updateApiUrls(file);
  });
  
  console.log('API URL update complete!');
}

main(); 