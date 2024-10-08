type ChambersResponse = {
  id: string
  name: string
  type: 'temp' | 'press'
  status: 'deg' | 'vent' | 'comp' | 'port'
  value: string
}[]

export async function getChambers(): Promise<ChambersResponse> {
  const response = await fetch('http://localhost:3000/api/chambers/summary')
  const data = await response.json()
  return data
}
