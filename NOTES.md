node -e "JSON.parse(require('node:fs').readFileSync('package.json', 'utf8')); console.log('valid JSON')"
npm pkg get name version private workspaces
