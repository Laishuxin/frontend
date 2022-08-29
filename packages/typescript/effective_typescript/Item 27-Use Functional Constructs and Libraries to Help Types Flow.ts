import { groupBy, mapValues, maxBy } from 'lodash-es'

interface BasketballPlayer {
  name: string
  team: string
  salary: number
}
declare const rosters: { [team: string]: BasketballPlayer[] }

// let allPlayers = []
// for (const player of Object.values(rosters)) {
//   allPlayers = allPlayers.concat(player)
// }

const allPlayers = [
  { team: 'GSW', salary: 37457154, name: 'Stephen Curry' },
  { team: 'HOU', salary: 35654150, name: 'Chris Paul' },
  { team: 'LAL', salary: 35654150, name: 'LeBron James' },
  { team: 'OKC', salary: 35654150, name: 'Russell Westbrook' },
  { team: 'DET', salary: 32088932, name: 'Blake Griffin' },
  { team: 'DET', salary: 32088, name: 'Jack' },
]

const teams = mapValues(
  groupBy(allPlayers, p => p.team),
  players => maxBy(players, p => p.salary),
)
console.log('teams: ', teams)
