<script>
  import { onMount } from 'svelte'
  import { URL } from '$lib'
  import { genData, Challenge } from '$lib/helpers'

  onMount(async () => {
    const response = await fetch(URL)
    const csv = await response.text()
    const { rawData, filteredData } = genData(csv)
    const challenge = new Challenge(filteredData)
    console.log(rawData)
    console.log(filteredData)
    console.log(challenge.data)
    console.log(challenge.dataByTeam)
    console.log(challenge.sumsByTeam)
  })
</script>

<h1>Bem vindo ao Evolução Fitness</h1>

<style>
  h1 {
    color: var(--color-primary-dark);
  }
</style>
