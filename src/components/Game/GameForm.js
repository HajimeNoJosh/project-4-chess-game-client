import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GameForm = (props) => {
  const { handleSubmit, cancelPath } = props
  return (
    <div className="row">
      <div>
        <h2>Add A Move</h2>
        <Form onSubmit={handleSubmit}>
          <Button type="submit" variant="primary">Submit</Button>
          <Button type="button" href={cancelPath} variant="secondary" className="ml-2">Cancel</Button>
        </Form>
      </div>
    </div>
  )
}

export default GameForm
