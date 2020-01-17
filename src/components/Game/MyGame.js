import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import GameForm from './GameForm.js'
import CoordTable from './CoordTable.js'
import Board from '../Board/Board.js'

const MyGame = (props) => {
  const [origBoard, setOrigBoard] = useState([
    ['BlR', 'BlN', 'BlB', 'BlQ', 'BlK', 'BlB', 'BlN', 'BlR'],
    ['BlP', 'BlP', 'BlP', 'BlP', 'BlP', 'BlP', 'BlP', 'BlP'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
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
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const reverseAlphabet = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
  // const [updated, setUpdated] = useState(false)
  const [game, setGame] = useState({ coords: [] })
  // const [currCoord, setCurrCoord] = useState('')
  const [initialCoord, setInitialCoord] = useState(' ')
  const [initialCoordText, setInitialCoordText] = useState(' ')
  // const [destinationCoord, setDestinationCoord] = useState(' ')
  const [initialCoordTextLetter, setInitialCoordTextLetter] = useState(' ')
  const [initialCoordNumber, setInitialCoordNumber] = useState(' ')
  const [turn, setTurn] = useState(1)
  const [playerOne, setPlayerOne] = useState(true)
  const [player, setPlayer] = useState('W')
  const [initialSquareShade, setInitialSquareShade] = useState('W')
  const [gameOver, setGameOver] = useState(false)
  const [updated, setUpdated] = useState(false)

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
      .catch(() => props.alert({ heading: 'Could not get game', message: 'Unfortunate circumstances', variant: 'danger' }))
  }, [])

  // useEffect(() => {
  //   if (initialCoord.length > 0) {
  //   }
  // }, [initialCoord])

  // useEffect(() => {
  //   if (destinationCoord.length > 0) {
  //     setDestinationCoord(' ')
  //   }
  // }, [destinationCoord])

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

  const getSecondCoordForOrigBoard = function (secondCoord) {
    for (let i = 0; i < coordBoard.length; i++) {
      for (let j = 0; j < coordBoard[i].length; j++) {
        if (secondCoord === coordBoard[i][j]) {
          const firstBCoordPosition = String(i)
          const secondBCoordPosition = String(j)
          return [firstBCoordPosition, secondBCoordPosition]
        }
      }
    }
  }

  const movePiece = function (coord, text) {
    if (parseInt(coord[1]) === 8 && initialCoordText === 'WhP') {
      const aWord = getCoordForOrigBoard(coord, text)
      const copyOrigBoard = origBoard
      copyOrigBoard[aWord[0]][aWord[1]] = ' '
      setOrigBoard(copyOrigBoard)
      const bWord = getSecondCoordForOrigBoard(coord)
      const copyOrigBoardDesination = origBoard
      copyOrigBoardDesination[bWord[0]][bWord[1]] = 'WhQ'
      setOrigBoard(copyOrigBoardDesination)
      setInitialCoordText(' ')
    } else if (parseInt(coord[1]) === 1 && initialCoordText === 'BlP') {
      const aWord = getCoordForOrigBoard(coord, text)
      const copyOrigBoard = origBoard
      copyOrigBoard[aWord[0]][aWord[1]] = ' '
      setOrigBoard(copyOrigBoard)
      const bWord = getSecondCoordForOrigBoard(coord)
      const copyOrigBoardDesination = origBoard
      copyOrigBoardDesination[bWord[0]][bWord[1]] = 'BlQ'
      setOrigBoard(copyOrigBoardDesination)
      setInitialCoordText(' ')
    } else {
      const aWord = getCoordForOrigBoard(coord, text)
      const copyOrigBoard = origBoard
      copyOrigBoard[aWord[0]][aWord[1]] = ' '
      // Active piece
      setOrigBoard(copyOrigBoard)
      // const bWord = getSecondCoordForOrigBoard(coord)
      // const copyOrigBoardDesination = origBoard
      copyOrigBoard[aWord[0]][aWord[1]] = initialCoordText
      setOrigBoard(copyOrigBoard)
      setInitialCoordText(' ')
    }
  }
  const checkPieceDestination = function (text, coord, squareShade) {
    if (initialCoordTextLetter + initialCoordNumber === coord) {
      return true
    }
    const origBoardCoord = getCoordForOrigBoard(coord)
    const firstCoord = origBoardCoord[0]
    const secondCoord = origBoardCoord[1]
    if (text === 'WhP') {
      // // // // console.log(initialCoordTextLetter, 'initialCoordTextLetter')
      // // // // console.log(coord[1], 'coord[1]')
      // // // // console.log(initialCoordNumber, 'initialCoordNumber')
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      const whichToUse = endAlphabetGoal - beginingAlphabetGoal
      const letterNumberInitial = initialCoordTextLetter + initialCoordNumber
      const numberInital = Math.abs(letterNumberInitial[1] - coord[1])
      // // // console.log(coord)
      const origBoardCoord = getCoordForOrigBoard(coord)
      const firstCoord = origBoardCoord[0]
      const secondCoord = origBoardCoord[1]
      // can potentially use > to compare coord[1] and initialCoordNumber
      if (coord[1] - initialCoordNumber > 0 && whichToUse === 0) {
        if (checkingForPiecesAlongPathToDestinationUp(coord, text)) {
          return false
        }
      }
      // // // console.log(origBoard[firstCoord][secondCoord])
      if (origBoard[firstCoord][secondCoord] !== ' ' && initialCoordTextLetter === coord[0]) {
        return false
      } else if (coordNumber === 1 && numberInital === 1 && origBoard[firstCoord][secondCoord][0] === 'B') {
        setInitialCoord(coord)
        // // // console.log(initialCoord, 'initialCoord')
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        if (parseInt(coord[1]) === 4 && parseInt(initialCoordNumber) + 2 === parseInt(coord[1]) && initialCoordTextLetter === coord[0]) {
          return true
        } else if (parseInt(initialCoordNumber) + 1 === parseInt(coord[1]) && initialCoordTextLetter === coord[0]) {
          return true
        } else {
          return false
        }
      }
    } else if (text === 'BlP') {
      // // // // console.log(initialCoordTextLetter, 'initialCoordTextLetter')
      // // // // console.log(coord[1], 'coord[1]')
      // // // // console.log(initialCoordNumber, 'initialCoordNumber')
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      const whichToUse = endAlphabetGoal - beginingAlphabetGoal
      const letterNumberInitial = initialCoordTextLetter + initialCoordNumber
      const numberInital = Math.abs(letterNumberInitial[1] - coord[1])
      // // // console.log(coord)
      const origBoardCoord = getCoordForOrigBoard(coord)
      const firstCoord = origBoardCoord[0]
      const secondCoord = origBoardCoord[1]
      if (coord[1] - initialCoordNumber < 0 && whichToUse === 0) {
        if (checkingForPiecesAlongPathToDestinationDown(coord, text)) {
          return false
        }
      }
      // // // console.log(origBoard[firstCoord][secondCoord])
      if (origBoard[firstCoord][secondCoord] !== ' ' && initialCoordTextLetter === coord[0]) {
        return false
      } else if (coordNumber === 1 && numberInital === 1 && origBoard[firstCoord][secondCoord][0] === 'W') {
        setInitialCoord(coord)
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        if (parseInt(coord[1]) === 5 && parseInt(initialCoordNumber) - 2 === parseInt(coord[1]) && initialCoordTextLetter === coord[0]) {
          return true
        } else if (parseInt(initialCoordNumber) - 1 === parseInt(coord[1]) && initialCoordTextLetter === coord[0]) {
          return true
        } else {
          return false
        }
      }
    } else if (text[2] === 'R') {
      // // // // console.log(initialCoordNumber)
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = endAlphabetGoal - beginingAlphabetGoal
      if (coord[1] - initialCoordNumber > 0) {
        if (checkingForPiecesAlongPathToDestinationUp(coord, text)) {
          return false
        }
      }
      if (coord[1] - initialCoordNumber < 0) {
        if (checkingForPiecesAlongPathToDestinationDown(coord, text)) {
          return false
        }
      }
      if (coord[1] === initialCoordNumber && coordNumber > 0) {
        if (checkingForPiecesAlongPathToDestinationRight(coord, text)) {
          return false
        }
      }
      if (coord[1] === initialCoordNumber && coordNumber < 0) {
        if (checkingForPiecesAlongPathToDestinationLeft(coord, text)) {
          return false
        }
      }

      if (initialCoordTextLetter === coord[0] || coord[1] === initialCoordNumber) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        return false
      }
    } else if (text === 'WhB') {
      // // // // console.log(initialCoordNumber)
      // // // // console.log(coord)
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)

      // if (checkingForPiecesAlongPathToDestinationRightForwardDiagonal(coord, text)) {
      //   return false
      // }
      const whichToUse = endAlphabetGoal - beginingAlphabetGoal
      // // console.log(initialCoordNumber > coord[1])
      // // console.log(whichToUse < 0)
      // // console.log(initialCoordNumber)
      // // console.log(whichToUse)
      if (initialCoordNumber < coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber < coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) + parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) - parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        return false
      }
    } else if (text === 'BlB') {
      // // // // console.log(initialCoordNumber)
      // // // // console.log(coord)
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      const whichToUse = endAlphabetGoal - beginingAlphabetGoal
      if (initialCoordNumber < coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber < coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) - parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) + parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        return false
      }
    } else if (text === 'WhQ') {
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)

      const whichToUse = endAlphabetGoal - beginingAlphabetGoal
      if (initialCoordNumber < coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber < coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftBackwardDiagonal(coord, text)) {
          return false
        }
      }
      // console.log(whichToUse)
      if (coord[1] - initialCoordNumber > 0 && whichToUse === 0) {
        if (checkingForPiecesAlongPathToDestinationUp(coord, text)) {
          return false
        }
      }
      if (coord[1] - initialCoordNumber < 0 && whichToUse === 0) {
        if (checkingForPiecesAlongPathToDestinationDown(coord, text)) {
          return false
        }
      }
      if (coord[1] === initialCoordNumber && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRight(coord, text)) {
          return false
        }
      }
      if (coord[1] === initialCoordNumber && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeft(coord, text)) {
          return false
        }
      }

      if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) + parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) - parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else if (initialCoordTextLetter === coord[0] || coord[1] === initialCoordNumber) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        return false
      }
    } else if (text === 'BlQ') {
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      const whichToUse = endAlphabetGoal - beginingAlphabetGoal
      if (initialCoordNumber < coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRightBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber < coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftForwardDiagonal(coord, text)) {
          return false
        }
      }
      if (initialCoordNumber > coord[1] && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeftBackwardDiagonal(coord, text)) {
          return false
        }
      }
      if (coord[1] - initialCoordNumber > 0 && whichToUse === 0) {
        if (checkingForPiecesAlongPathToDestinationUp(coord, text)) {
          return false
        }
      }
      if (coord[1] - initialCoordNumber < 0 && whichToUse === 0) {
        if (checkingForPiecesAlongPathToDestinationDown(coord, text)) {
          return false
        }
      }
      if (coord[1] === initialCoordNumber && whichToUse > 0) {
        if (checkingForPiecesAlongPathToDestinationRight(coord, text)) {
          return false
        }
      }
      if (coord[1] === initialCoordNumber && whichToUse < 0) {
        if (checkingForPiecesAlongPathToDestinationLeft(coord, text)) {
          return false
        }
      }

      if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) - parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else if (initialCoordTextLetter !== coord[0] && parseInt(coord[1]) === parseInt(initialCoordNumber) + parseInt(coordNumber) && squareShade === initialSquareShade) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      }
      if (initialCoordTextLetter === coord[0] || coord[1] === initialCoordNumber) {
        if (origBoard[firstCoord][secondCoord][2] === 'K') {
          setGameOver(true)
        }
        return true
      } else {
        return false
      }
    } else if (text === 'WhK') {
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      if (coordNumber === 1 || coordNumber === 0) {
        if (Math.abs(coord[1] - initialCoordNumber) === 1 || Math.abs(coord[1] - initialCoordNumber) === 0) {
          return true
        } else {
          console.log(coord)
        }
      }
      // if (parseInt(initialCoordNumber) + 1 === parseInt(coord[1]) || parseInt(initialCoordNumber) - 1 === parseInt(coord[1])) {
      //   return true
      // } else {
      //   return false
      // }
    } else if (text === 'BlK') {
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      if (coordNumber === 1 || coordNumber === 0) {
        if (Math.abs(coord[1] - initialCoordNumber) === 1 || Math.abs(coord[1] - initialCoordNumber) === 0) {
          return true
        }
      }
    } else if (text[2] === 'N') {
      const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
      const endAlphabetGoal = alphabet.indexOf(coord[0])
      const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
      if (coordNumber === 2) {
        if (parseInt(coord[1]) === parseInt(initialCoordNumber) - 1 || parseInt(coord[1]) === parseInt(initialCoordNumber) + 1) {
          if (origBoard[firstCoord][secondCoord][2] === 'K') {
            setGameOver(true)
          }
          return true
        } else {
          return false
        }
      } else if (coordNumber === 1) {
        if (parseInt(coord[1]) === parseInt(initialCoordNumber) - 2 || parseInt(coord[1]) === parseInt(initialCoordNumber) + 2) {
          if (origBoard[firstCoord][secondCoord][2] === 'K') {
            setGameOver(true)
          }
          return true
        } else {
          return false
        }
      }
    }
  }

  const changeTurn = function () {
    if (playerOne) {
      setPlayer('B')
    } else {
      setPlayer('W')
    }
    setPlayerOne(!playerOne)
  }

  const checkingForSameColorPieces = function (text) {
    if (initialCoordText[0] === text[0]) {
      return true
    } else {
      return false
    }
  }

  const handleClick = (coord, text, squareShade) => {
    // // // console.log(origBoard)
    // // // console.log(coord)
    if (turn % 2 !== 0) {
      if (text[0] === player) {
        let newCoords = ' '
        setTurn(turn + 1)
        setInitialCoord(coord)
        // // // // console.log('destinationCoord', destinationCoord)
        if (game.coords.length === 0) {
          newCoords = [...game.coords, text + coord]
        } else {
          newCoords = [...game.coords, ', ' + text + coord]
        }
        setGame(game => ({ ...game, coords: newCoords }))
        movePiece(coord, text)
        setInitialCoordText(text)
        setInitialCoordTextLetter(coord[0])
        setInitialCoordNumber(coord[1])
        setInitialSquareShade(squareShade)
      }
    } else if (!checkingForSameColorPieces(text)) {
      if (checkPieceDestination(initialCoordText, coord, squareShade)) {
        // setDestinationCoord(coord)

        if (initialCoord !== coord) {
          changeTurn()
          setTurn(turn + 1)
        } else {
          setTurn(turn - 1)
          setInitialCoordText(' ')
          setInitialCoordTextLetter(' ')
          setInitialCoordNumber(' ')
          setInitialSquareShade(' ')
        }
        let newCoords = ' '

        if (game.coords.length === 0) {
          newCoords = [...game.coords, text + coord]
        } else {
          newCoords = [...game.coords, ', ' + text + coord]
        }
        if (initialCoord === coord) {
          newCoords.pop()
          newCoords.pop()
        }
        setGame(game => ({ ...game, coords: newCoords }))
        movePiece(coord, text)
      }
    }
  }
  const checkingForPiecesAlongPathToDestinationRightForwardDiagonal = function (coord, text) {
    const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
    const endAlphabetGoal = alphabet.indexOf(coord[0])
    const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
    // // console.log(coordNumber)
    const firstCoordPosition = initialCoordTextLetter + initialCoordNumber
    for (let i = 1; i < coordNumber + 1; i++) {
      const number = alphabet.indexOf(firstCoordPosition[0])
      const letters = alphabet[number + i]
      const allCoords = letters + (parseInt(initialCoordNumber) + i)
      // console.log(allCoords)
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      if (i < coordNumber) {
        // console.log(572)
        if (origBoard[coordA][coordB] !== ' ') {
          // console.log(origBoard[coordA][coordB])
          // console.log('hi')
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          // console.log('other hi')
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationRightBackwardDiagonal = function (coord, text) {
    const beginingAlphabetGoal = alphabet.indexOf(initialCoordTextLetter)
    const endAlphabetGoal = alphabet.indexOf(coord[0])
    const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
    // // console.log(coordNumber)
    const firstCoordPosition = initialCoordTextLetter + initialCoordNumber
    for (let i = 1; i < coordNumber + 1; i++) {
      const number = alphabet.indexOf(firstCoordPosition[0])
      const letters = alphabet[number + i]
      const allCoords = letters + (parseInt(initialCoordNumber) - i)
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationLeftForwardDiagonal = function (coord, text) {
    const beginingAlphabetGoal = reverseAlphabet.indexOf(initialCoordTextLetter)
    const endAlphabetGoal = reverseAlphabet.indexOf(coord[0])
    const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
    // // console.log(coordNumber)
    const firstCoordPosition = initialCoordTextLetter + initialCoordNumber
    // // console.log(firstCoordPosition)
    for (let i = 1; i < coordNumber + 1; i++) {
      const number = reverseAlphabet.indexOf(firstCoordPosition[0])
      const letters = reverseAlphabet[number + i]
      const allCoords = letters + (parseInt(initialCoordNumber) + i)
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationLeftBackwardDiagonal = function (coord, text) {
    const beginingAlphabetGoal = reverseAlphabet.indexOf(initialCoordTextLetter)
    const endAlphabetGoal = reverseAlphabet.indexOf(coord[0])
    const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
    // // console.log(coordNumber)
    const firstCoordPosition = initialCoordTextLetter + initialCoordNumber
    // // console.log(firstCoordPosition)
    for (let i = 1; i < coordNumber + 1; i++) {
      const number = reverseAlphabet.indexOf(firstCoordPosition[0])
      const letters = reverseAlphabet[number + i]
      const allCoords = letters + (parseInt(initialCoordNumber) - i)
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      // // console.log(allCoords)
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationUp = function (coord, text) {
    // // console.log(coord[1])
    // // console.log(initialCoordNumber)
    const coordNumber = Math.abs(coord[1] - initialCoordNumber)
    // // console.log(coordNumber)
    for (let i = 1; i < coordNumber + 1; i++) {
      const letters = coord[0]
      const allCoords = letters + (parseInt(initialCoordNumber) + i)
      // // console.log(allCoords)
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      // // console.log(allCoords)
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationDown = function (coord, text) {
    // // console.log(coord[1])
    // // console.log(initialCoordNumber)
    const coordNumber = Math.abs(coord[1] - initialCoordNumber)
    // // console.log(coordNumber)
    for (let i = 1; i < coordNumber + 1; i++) {
      const letters = coord[0]
      const allCoords = letters + (parseInt(initialCoordNumber) - i)
      // // console.log(allCoords)
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      // // console.log(allCoords)
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationRight = function (coord, text) {
    // // console.log(coord[1])
    // // console.log(initialCoordNumber)
    const beginingAlphabetGoal = reverseAlphabet.indexOf(initialCoordTextLetter)
    const endAlphabetGoal = reverseAlphabet.indexOf(coord[0])
    const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
    // console.log(coordNumber)
    for (let i = 1; i < coordNumber + 1; i++) {
      const number = alphabet.indexOf(initialCoordTextLetter)
      const letters = alphabet[number + i]
      const allCoords = letters + (parseInt(initialCoordNumber))
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      // // console.log(allCoords)
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const checkingForPiecesAlongPathToDestinationLeft = function (coord, text) {
    // // console.log(coord[1])
    // // console.log(initialCoordNumber)
    const beginingAlphabetGoal = reverseAlphabet.indexOf(initialCoordTextLetter)
    const endAlphabetGoal = reverseAlphabet.indexOf(coord[0])
    const coordNumber = Math.abs(endAlphabetGoal - beginingAlphabetGoal)
    for (let i = 1; i < coordNumber + 1; i++) {
      const number = alphabet.indexOf(initialCoordTextLetter)
      const letters = alphabet[number - i]
      const allCoords = letters + (parseInt(initialCoordNumber))
      const coordsForFindingPiece = getCoordForOrigBoard(allCoords)
      const coordA = coordsForFindingPiece[0]
      const coordB = coordsForFindingPiece[1]
      // // console.log(allCoords)
      if (i < coordNumber) {
        if (origBoard[coordA][coordB] !== ' ') {
          return true
        }
      } else {
        if (origBoard[coordA][coordB][0] === text[0]) {
          return true
        }
      }
    }
  }

  const gameOverJsx = function () {
    if (gameOver === false) {
      return <div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <h1 className='center gamesplayedtitle'>Make A Move</h1>
              <Board text={props.text} squareShade={props.squareShade} onClick={handleClick} origBoard={origBoard} />
              <GameForm
                handleSubmit={handleSubmit}
                cancelPath={`#games/${props.match.params.id}`}
              />
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12">
              <h1 className='center gamesplayedtitle'>Moves Played</h1>
              <CoordTable coords={game.coords} />
              <div className={'box ' + player}>
              </div>
            </div>

          </div>
        </div>
      </div>
    } else {
      if (updated === false) {
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
          .then(() => setUpdated(true))
          .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
      }
      return <h1> Game Over! </h1>
    }
  }

  return (
    <div>
      {gameOverJsx()}
    </div>
  )
}

export default withRouter(MyGame)
