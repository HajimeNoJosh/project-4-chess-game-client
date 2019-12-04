import React from 'react'

const Square = (props) => {
  return (
    <div
      className={'square ' + props.className + ' ' + props.text}
      id={props.id}
      text={props.text}
      onClick={props.onClick}>
      {props.text}
    </div>
  )
}

export default Square
