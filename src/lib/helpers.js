const extractTeam = (fullMember) => {
  const teamNameRegex = /Team ([^)]+)/
  const match = fullMember.match(teamNameRegex)
  return match ? match[1] : 'No team found'
}

export const genData = (csv) => {
  const lines = csv.split('\n')
  let rawData = []
  let groupByMemberAndDate = {}
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    let [, date, member, , , post, agua, treino] = values
    const team = extractTeam(member)
    agua = agua.includes('Sim') ? 1 : 0
    treino = treino.includes('Sim') ? 1 : 0
    post = post.includes('Sim') && (agua || treino) ? 0.5 : 0

    // groupByMemberAndDate
    const keyMD = member + date
    if (!groupByMemberAndDate[keyMD]) {
      groupByMemberAndDate[keyMD] = {
        date,
        member,
        team,
        agua,
        treino,
        post
      }
    }
    groupByMemberAndDate[keyMD] = {
      ...groupByMemberAndDate[keyMD],
      agua: Math.min(1, groupByMemberAndDate[keyMD].agua + agua),
      treino: Math.min(1, groupByMemberAndDate[keyMD].treino + treino),
      post: Math.min(0.5, groupByMemberAndDate[keyMD].post + post)
    }
    rawData.push({
      date,
      member,
      team,
      agua,
      treino,
      post
    })
  }
  return {
    rawData,
    filteredData: Object.values(groupByMemberAndDate)
  }
}

export class Challenge {
  constructor(inputData) {
    this.data = inputData
    this.dataByTeam = {}
    this.sumsByTeam = {}
    this.processData()
  }

  processData() {
    this.data.forEach((item) => {
      const { team, agua, treino, post } = item

      // Initialize team data structure if it doesn't exist
      if (!this.dataByTeam[team]) {
        this.dataByTeam[team] = []
        this.sumsByTeam[team] = { agua: 0, treino: 0, post: 0, total: 0 }
      }

      // Add the current item to the team's data
      this.dataByTeam[team].push(item)

      // Update the sums for the team
      this.sumsByTeam[team].agua += agua
      this.sumsByTeam[team].treino += treino
      this.sumsByTeam[team].post += post
      this.sumsByTeam[team].total =
        this.sumsByTeam[team].agua + this.sumsByTeam[team].treino + this.sumsByTeam[team].post
    })
  }
}
