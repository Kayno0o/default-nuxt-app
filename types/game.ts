export interface Player {
  username?: string
  color?: string
  id: string
  token: string
}

export type TicTacToeState = 'pending' | 'p1' | 'p2' | 'tie'

export interface WsTicTacToeGame {
  p1?: Player
  p2?: Player
  currentPlayer: 1 | 2
  board: number[][]
  state: TicTacToeState
}

export interface WsRoom<T> {
  users: Player[]
  data: T
}
