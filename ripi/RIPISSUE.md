# RIPISSUE

<!-- toc -->

- [Backlog](#backlog)
- [Done](#done)

<!-- tocstop -->

- [ ] review post calc: the post will count just in the end, after the sum of total (if total is > 0, post will count)
- [ ] data_table_to_show_all_the_data

## Backlog

- [ ] team section
  - [ ] donut chart (team leader at center)
  - [ ] line chart with both teams totals
  - [ ] treemap (one big section by team, and inside the individual)
- [ ] individual page?

  - calheatmap?
  - linechart?
  - how much I contribute to the team?

- [ ] photo feed?
- [ ] setup evolucao-fitness.gubasso.xyz domain

## Done

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
