import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const Home = props => {
  const [games, setGames] = useState([])
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

  const gamesJsx = games.map(game => {
    if (game.coords.length > 0) {
      return (<a key={game._id} href={`#/games/${game._id}`} className='games'>
        {game.coords}
      </a>)
    }
  })

  return (
    <div>
      <h4 className='center'>Welcome, {props.user.email}</h4>

      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1 className='center chesstitle'> Chess </h1>

            <a href="#create-game" className='center button'>Play</a>
            <a href="#how-to-play" className='center button'>How To Play</a>
          </div>
          <div className="col-sm-6">
            <h1 className='center gamesplayedtitle'>Games Played</h1>
            <ListGroup className='heightGames'>
              {gamesJsx}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
