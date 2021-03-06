import React from 'react'
import Form from 'react-bootstrap/Form'

const GameForm = (props) => {
  const { handleSubmit } = props
  return (
    <div className="row">
      <div>
        <Form onSubmit={handleSubmit}>
          <button type="submit" variant="primary" className='centerbutton'>Submit Your Moves</button>
        </Form>
      </div>
    </div>
  )
}

export default GameForm
