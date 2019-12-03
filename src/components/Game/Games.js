import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import { withRouter } from 'react-router-dom'

const Games = props => {
  const [games, setGames] = useState([])
  // const userId = props.user._id

  useEffect(() => {
    axios({
      url: `${apiUrl}/games`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(props.alert({
        heading: 'You got games',
        message: messages.gotBooks,
        variant: 'success'
      }))
      .then(res => setGames(res.data.games))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }, [])

  const gamesJsx = games.map(game => (
    <ListGroup.Item key={game._id} as={'a'} href={`#/games/${game._id}`}>
      {game.coords}
    </ListGroup.Item>
  ))

  return (
    <div>
      <ListGroup>
        {gamesJsx}
      </ListGroup>
    </div>
  )
}

export default withRouter(Games)
