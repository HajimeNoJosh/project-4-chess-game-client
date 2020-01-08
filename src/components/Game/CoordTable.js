import React from 'react'

const CoordTable = (props) => {
  const coords = []

  for (let i = 0; i < props.coords.length; i++) {
    if (i === 0) {
      const initialPiece = props.coords[i].slice(0, 3)
      const initialCoord = props.coords[i].slice(-2)
      coords.push(
        <span
          key={i}><span
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
        <span key={i}>
          <span
            className={'coords piece2 ' + initialPiece}>{initialCoord}</span></span>)
    }
  }

  return (
    <div className='coordtable'>
      {coords}
    </div>
  )
}

export default CoordTable
