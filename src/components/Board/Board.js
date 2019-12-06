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

      const text = props.origBoard[j][i]
      // if (isTwo(coord[1]) || isSeven(coord[1])) {
      //   text = 'P'
      // } else if (coord === 'A8' || coord === 'H8' || coord === 'A1' || coord === 'H1') {
      //   text = 'R'
      // } else if (coord === 'B8' || coord === 'G8' || coord === 'B1' || coord === 'G1') {
      //   text = 'N'
      // } else if (coord === 'C8' || coord === 'F8' || coord === 'C1' || coord === 'F1') {
      //   text = 'B'
      // } else if (coord === 'E8' || coord === 'E1') {
      //   text = 'K'
      // } else if (coord === 'D8' || coord === 'D1') {
      //   text = 'Q'
      // } else {
      //   text = ''
      // }

      squareRows.push(<Square
        id={coord}
        key={coord}
        className={squareShade}
        text={text}
        onClick={() => props.onClick(coord, text, squareShade) }> </Square>)
    }
    board.push(<div key={i}>{squareRows}</div>)
  }

  // const changeText = function (coord, text) {
  //   // console.log(coord)
  // }

  return (
    <div className='game mt-4' text={props.text}>
      {board}
    </div>
  )
}

export default Board
