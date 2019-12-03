import React from 'react'
import Square from './Square.js'

const Board = (props) => {
  const h = 8
  const w = 8
  const board = []
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let num = 8

  const isEven = function (num) {
    return num % 2 === 0
  }

  for (let i = 0; i < w; i++) {
    const squareRows = []
    for (let j = 0; j < h; j++) {
      let squareShade = ''
      let coord = ''

      if (isEven(i) && isEven(j)) {
        squareShade = 'light-square'
      } else if (!isEven(i) && !isEven(j)) {
        squareShade = 'light-square'
      } else {
        squareShade = 'dark-square'
      }
      coord = alphabet[i] + (j + num)
      num -= 2
      if (num === -8) {
        num = 8
      }

      squareRows.push(<Square
        id={coord}
        key={coord}
        className={squareShade}
        onClick={() => props.onClick(coord) } />)
    }
    board.push(<div key={i}>{squareRows}</div>)
  }

  return (
    <div className = 'game'>
      {board}
    </div>
  )
}

export default Board
