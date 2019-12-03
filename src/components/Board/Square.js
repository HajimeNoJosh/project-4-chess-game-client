import React from 'react'

const Square = (props) => {
  return (
    <div className={'square ' + props.className} id={props.id} onClick={props.onClick}>
    </div>
  )
}

export default Square
