const extractTeam = (fullMember) => {
  const teamNameRegex = /Team ([^)]+)/
  const match = fullMember.match(teamNameRegex)
  return match ? match[1] : 'No team found'
}

function isValidDateFormat(dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!regex.test(dateString)) {
    return false
  }
  const [day, month, year] = dateString.split('/').map((part) => parseInt(part, 10))
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false
  }
  const dateObj = new Date(year, month - 1, day)
  return (
    dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day
  )
}

export const genData = (csv) => {
  const lines = csv.split('\n')
  let rawData = []
  let groupByMemberAndDate = {}
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    let [, date, member, hasAgua, hasTreino, hasPost, ,] = values
    if (!isValidDateFormat(date)) continue
    const team = extractTeam(member)

    // groupByMemberAndDate
    const keyMD = member + date
    if (!groupByMemberAndDate[keyMD]) {
      groupByMemberAndDate[keyMD] = {
        date,
        member,
        team,
        hasAgua,
        hasTreino,
        hasPost
      }
    }
    groupByMemberAndDate[keyMD] = {
      ...groupByMemberAndDate[keyMD],
      hasAgua:
        groupByMemberAndDate[keyMD].hasAgua.includes('Sim') || hasAgua.includes('Sim')
          ? 'Sim'
          : 'Nao',
      hasTreino:
        groupByMemberAndDate[keyMD].hasTreino.includes('Sim') || hasTreino.includes('Sim')
          ? 'Sim'
          : 'Nao',
      hasPost:
        groupByMemberAndDate[keyMD].hasPost.includes('Sim') || hasPost.includes('Sim')
          ? 'Sim'
          : 'Nao'
    }
    rawData.push({
      date,
      member,
      team,
      hasAgua,
      hasTreino,
      hasPost
    })
  }
  return {
    rawData,
    filteredData: Object.values(groupByMemberAndDate)
  }
}

const calcPoints = (obj) => {
  const { hasAgua, hasTreino, hasPost } = obj
  const isAgua = hasAgua.includes('Sim')
  const isTreino = hasTreino.includes('Sim')
  const isPost = hasPost.includes('Sim')
  return {
    agua: isAgua ? 1 : 0,
    treino: isTreino ? 1 : 0,
    post: isPost && (isAgua || isTreino) ? 0.5 : 0
  }
}

export class Challenge {
  constructor(inputData) {
    this.data = []
    this.dataByTeam = {}
    this.sumsByTeam = {}
    this.processData(inputData)
  }

  processData(inputData) {
    inputData.forEach((item) => {
      const { team } = item

      // Initialize team data structure if it doesn't exist
      if (!this.dataByTeam[team]) {
        this.dataByTeam[team] = []
        this.sumsByTeam[team] = { agua: 0, treino: 0, post: 0, total: 0 }
      }

      const points = calcPoints(item)

      const newItem = {
        ...item,
        ...points
      }

      this.data.push(newItem)
      // Add the current item to the team's data
      this.dataByTeam[team].push(newItem)

      // Update the sums for the team
      this.sumsByTeam[team].agua += points.agua
      this.sumsByTeam[team].treino += points.treino
      this.sumsByTeam[team].post += points.post
      this.sumsByTeam[team].total =
        this.sumsByTeam[team].agua + this.sumsByTeam[team].treino + this.sumsByTeam[team].post
    })
  }
}
