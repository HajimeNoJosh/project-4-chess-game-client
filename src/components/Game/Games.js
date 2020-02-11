import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import { withRouter } from 'react-router-dom'
import Board from '../Board/Board.js'
import CoordTable from './CoordTable.js'

const Games = props => {
  const [games, setGames] = useState([])
  // const userId = props.user._id

  const handleClick = () => {
  }

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

  if (!games) {
    return <p>Loading...</p>
  }

  const gamesJsx = games.map(game => {
    if (game.coords.length > 0) {
      return (
        <div key={game._id}>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-12 col-md-12">
                <a className='center gamesplayedtitle' href={`#/games/${game._id}`}><h1>Moves Played</h1></a>
                <Board onClick={handleClick} origBoard={game.origBoard} />
              </div>
              <div className="col-xl-6 col-lg-12 col-md-12">
                <h1 className='center gamesplayedtitle'>Coords</h1>
                <CoordTable coords={game.coords} />
              </div>
            </div>
          </div>
        </div>)
    }
  })

  return (
    <div>
      <ListGroup>
        {gamesJsx}
      </ListGroup>
    </div>
  )
}

export default withRouter(Games)
