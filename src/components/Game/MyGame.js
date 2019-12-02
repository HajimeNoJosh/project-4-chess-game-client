import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'

const MyGame = (props) => {
  console.log(props)
  const [game, setGame] = useState(null)
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

  if (!game) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{game.coords}</h1>
    </div>
  )
}

export default withRouter(MyGame)
