import React, { useEffect, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Board from '../Board/Board.js'
import CoordTable from './CoordTable.js'

const Game = (props) => {
  const [game, setGame] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const userId = props.user._id

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

  const destroy = () => {
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'DELETE',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(() => setDeleted(true))
      .then(props.alert({
        heading: 'You deleted a game',
        message: 'This game was deleted',
        variant: 'success'

      }))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/home', state: { msg: 'Game succesfully deleted!' } }
    } />
  }

  if (!game) {
    return <p>Loading...</p>
  }

  const handleClick = () => {
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-12 col-md-12">
            <h1 className='center gamesplayedtitle'>State of the Board</h1>
            <Board onClick={handleClick} origBoard={game.origBoard} />
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12">
            <h1 className='center gamesplayedtitle'>Moves Played</h1>
            <CoordTable coords={game.coords} />
          </div>
        </div>
      </div>
      {userId === game.owner && <button className='btn btn-danger' onClick={destroy}> Delete </button>}
    </div>
  )
}

export default withRouter(Game)
