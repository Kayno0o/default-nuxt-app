export interface Player {
  username?: string
  color?: string
  id: string
  token: string
}

export type TicTacToeState = 'pending' | 'p1' | 'p2' | 'tie'

export interface WsTicTacToeGame {
  p1: Player | null
  p2: Player | null
  currentPlayer: 1 | 2
  board: number[][]
  state: TicTacToeState
}

export interface WsRoom<T extends object> {
  users: Player[]
  data: T
  messages: { username: string, content: string, color: string, id: string }[]
}
