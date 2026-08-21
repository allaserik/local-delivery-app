node -e "JSON.parse(require('node:fs').readFileSync('package.json', 'utf8')); console.log('valid JSON')"
npm pkg get name version private workspaces

docker compose up -d
docker compose ps
docker compose exec db psql -U muulo -d muulo -c '\conninfo'

npm exec --workspace=api -- prisma format
npm exec --workspace=api -- prisma migrate dev --name create_company
