import React, { useEffect, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Game = (props) => {
  const [game, setGame] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // const userId = props.user._id

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
      { pathname: '/games', state: { msg: 'Game succesfully deleted!' } }
    } />
  }

  if (!game) {
    return <p>Loading...</p>
  }
  console.log(game)
  return (
    <div>
      <h4>{game.coords}</h4>
      {<button className='btn btn-danger' onClick={destroy}> Delete </button>}
    </div>
  )
}

export default withRouter(Game)
