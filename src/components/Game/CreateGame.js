import React, { useEffect, useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'

const GameCreate = (props) => {
  const [game] = useState({ coords: [] })

  useEffect(() => {
    axios({
      url: `${apiUrl}/games`,
      method: 'POST',
      data: { game },
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(response => {
        props.history.push(`/game/${response.data.game._id}`)
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }, [])

  return (
    <div>
    </div>
  )
}

export default withRouter(GameCreate)
