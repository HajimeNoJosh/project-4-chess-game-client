import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import GameForm from './GameForm.js'
import Board from '../Board/Board.js'

const MyGame = (props) => {
  const [origBoard, setOrigBoard] = useState([
    ['BlR', 'BlN', 'BlB', 'BlQ', 'BlK', 'BlB', 'BlN', 'BlR'],
    ['BlP', 'BlP', 'BlP', 'BlP', 'BlP', 'BlP', 'BlP', 'BlP'],
    ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
    ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
    ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
    ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
    ['WhP', 'WhP', 'WhP', 'WhP', 'WhP', 'WhP', 'WhP', 'WhP'],
    ['WhR', 'WhN', 'WhB', 'WhQ', 'WhK', 'WhB', 'WhN', 'WhR']
  ])
  const coordBoard = [
    ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8'],
    ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1']
  ]
  // const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  // const [updated, setUpdated] = useState(false)
  const [game, setGame] = useState({ coords: [] })
  // const [currCoord, setCurrCoord] = useState('')
  const [initialCoord, setInitialCoord] = useState('')
  const [initialCoordText, setInitialCoordText] = useState('')
  const [turn, setTurn] = useState(1)

  useEffect(() => {
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(props.alert({
        heading: 'You got a game',
        message: 'This is a game',
        variant: 'success'
      }))
      .then(res => setGame(res.data.game))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }, [])

  useEffect(() => {
    if (initialCoord.length > 0) {
      console.log('initialCoord', initialCoord)
      setInitialCoord('')
    }
  }, [initialCoord])

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { game }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You updated a game', variant: 'success' })
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (!game) {
    return <p>Loading...</p>
  }
  const getCoordForOrigBoard = function (firstCoord, text) {
    for (let i = 0; i < coordBoard.length; i++) {
      for (let j = 0; j < coordBoard[i].length; j++) {
        if (firstCoord === coordBoard[i][j]) {
          const firstACoordPosition = String(i)
          const secondACoordPosition = String(j)
          return [firstACoordPosition, secondACoordPosition, text]
        }
      }
    }
  }

  const movePiece = function (coord, text) {
    const aWord = getCoordForOrigBoard(coord, text)
    if (turn % 2 !== 0) {
      const copyOrigBoard = origBoard
      copyOrigBoard[aWord[0]][aWord[1]] = ' '
      setInitialCoordText(text)
      setOrigBoard(copyOrigBoard)
    } else {
      const copyOrigBoard = origBoard
      copyOrigBoard[aWord[0]][aWord[1]] = initialCoordText
      setOrigBoard(copyOrigBoard)
    }
  }

  const handleClick = (coord, text) => {
    let newCoords = ''
    setTurn(turn + 1)
    console.log(turn)
    setInitialCoord(coord)
    // console.log('destinationCoord', destinationCoord)
    if (game.coords.length === 0) {
      newCoords = [...game.coords, text + coord]
    } else {
      newCoords = [...game.coords, ', ' + text + coord]
    }
    setGame(game => ({ ...game, coords: newCoords }))
    movePiece(coord, text)
  }

  return (
    <div>
      <Board text={props.text} onClick={handleClick} origBoard={origBoard} />
      <GameForm
        handleSubmit={handleSubmit}
        cancelPath={`#games/${props.match.params.id}`}
      />
      {game.coords}
    </div>
  )
}

export default withRouter(MyGame)
