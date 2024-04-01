<script>
  import { onMount } from 'svelte'

  let table = []

  onMount(async () => {
    const url =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTT4PgnLeIBMurR_X02uZjFVa9Udhf_OalusRH-0aj3VjEEPh-EYcBKascOg6fA38ecFGMRZpRy-XX3/pub?gid=201275323&single=true&output=csv'
    const response = await fetch(url)
    const csv = await response.text()
    table = parseCSV(csv)
    console.log(table)
  })

  // Simple CSV Parser (Assumes first row is headers)
  function parseCSV(csv) {
    const lines = csv.split('\n')
    let table = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      const [, date, membro, , , post, agua, treino] = values
      table.push({
        date,
        membro,
        post,
        agua,
        treino
      })
    }
    return table
  }
</script>

<h1>Bem vindo ao Evolução Fitness</h1>
