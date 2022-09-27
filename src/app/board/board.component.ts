import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: ('X' | 'O')[];
  xIsNest: boolean;
  winner: string;
  draw: boolean;
  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }
  newGame() {
    this.squares = Array(9).fill('');
    this.xIsNest = true;
    this.winner = null;
    this.draw = false;
  }
  get player() {
    return this.xIsNest ? 'X' : 'O';
  }
  get isGameEnd() {
    return this.winner || this.draw;
  }
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      console.log(idx, this.squares[idx]);
      this.squares.splice(idx, 1, this.player);
      this.xIsNest = !this.xIsNest;
    }
    this.winner = this.calculateWinner();
  }
  calculateWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[b] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    if (this.squares.every((val) => val === 'X' || val === 'O')) {
      this.draw = true;
    }
    return null;
  }
}
