# RIPISSUE

- [ ] setup evolucao-fitness.gubasso.xyz domain
- [x] deploy_with_github_actions_github_pages
- [x] form with correct scripts

  - [x] from 'dados', 'participantes' -> change form

old `deploy.yaml`

```yaml
jobs:
  build-and-deploy:
    concurrency: ci-${{ github.ref }} # Recommended if you intend to make multiple deployments in quick succession.
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
        run: |
          npm ci
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build
```
