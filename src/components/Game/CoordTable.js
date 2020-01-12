import React, { useEffect, useRef } from 'react'

const CoordTable = (props) => {
  const coords = []
  let turn = 1
  let color = 'black'
  const coordsEndRef = useRef(null)

  const scrollToBottom = () => {
    coordsEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [coords])

  for (let i = 0; i < props.coords.length; i++) {
    if (i === 0) {
      const initialPiece = props.coords[i].slice(0, 3)
      const initialCoord = props.coords[i].slice(-2)
      coords.push(
        <span
          key={i}>1<span
            className={'coords piece2 ' + initialPiece}>{initialCoord}</span></span>)
    } else if (i % 2 !== 0) {
      if ((props.coords[i])[2] === 'W' || (props.coords[i])[2] === 'B') {
        const initialPiece = props.coords[i].slice(2, 5)
        const destination = props.coords[i].slice(-2)
        coords.push(
          <span
            key={i}
            className={'coords piece2 alignRight ' + initialPiece}>{destination}</span>)
      } else {
        const destination = props.coords[i].slice(2, props.coords[i].length)
        coords.push(
          <span
            key={i}
            className={'coords alignRight ' + destination}>{destination}</span>)
      }
    } else {
      const initialPiece = props.coords[i].slice(2, 5)
      const initialCoord = props.coords[i].slice(-2)
      coords.push(
        <span key={i}>{turn}
          <span
            className={'coords piece2 ' + initialPiece}>{initialCoord}</span></span>)
      if (color === 'white') {
        color = 'black'
      } else {
        color = 'white'
        turn++
      }
    }
  }

  return (
    <div className='coordtable'>

      {coords}<div ref={coordsEndRef}/>
    </div>
  )
}

export default CoordTable
