import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import GameForm from './GameForm.js'

const MyGame = (props) => {
  // const [updated, setUpdated] = useState(false)
  const [game, setGame] = useState({ coords: [] })
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
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    console.log(event.target.value)
    setGame(game => ({ ...game, coords: [event.target.value] }))
  }

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
  console.log(game)

  return (
    <div>
      <GameForm
        game={game}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`#games/${props.match.params.id}`}
      />
      {game.coords}
    </div>
  )
}

export default withRouter(MyGame)