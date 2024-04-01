<script>
  import { onMount } from 'svelte'
  import { genData, Challenge } from '$lib/helpers'

  onMount(async () => {
    const url =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTT4PgnLeIBMurR_X02uZjFVa9Udhf_OalusRH-0aj3VjEEPh-EYcBKascOg6fA38ecFGMRZpRy-XX3/pub?gid=201275323&single=true&output=csv'
    const response = await fetch(url)
    const csv = await response.text()
    const { rawData, filteredData } = genData(csv)
    const challenge = new Challenge(filteredData)
    console.log(rawData)
    console.log(filteredData)
    console.log(challenge.dataByTeam)
    console.log(challenge.sumsByTeam)
  })
</script>

<h1>Bem vindo ao Evolução Fitness</h1>
