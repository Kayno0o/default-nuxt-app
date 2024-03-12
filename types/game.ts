export interface Player {
  username: string
  color: string
  id: string
}

export type TicTacToeState = 'pending' | 'p1' | 'p2' | 'tie'

export interface TicTacToeGame {
  p1?: Player
  p2?: Player
  currentPlayer: 1 | 2
  spectators: Map<string, Player>
  board: number[][]
  state: TicTacToeState
}
