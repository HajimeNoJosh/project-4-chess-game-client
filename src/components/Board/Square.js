import React from 'react'

const Square = (props) => {
  console.log(props.text)
  return (
    <div
      className={'square ' + props.className + ' ' + props.text + ' piece'}
      id={props.id}
      text={props.text}
      onClick={props.onClick}>
    </div>
  )
}

export default Square
