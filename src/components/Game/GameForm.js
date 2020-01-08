import React from 'react'
import Form from 'react-bootstrap/Form'

const GameForm = (props) => {
  const { handleSubmit } = props
  return (
    <div className="row">
      <div>
        <h2>Add A Move</h2>
        <Form onSubmit={handleSubmit}>
          <button type="submit" variant="primary" className='centerbutton'>Submit</button>
        </Form>
      </div>
    </div>
  )
}

export default GameForm
