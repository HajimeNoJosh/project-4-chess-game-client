import React, { useEffect, useRef } from 'react'

const CoordTable = (props) => {
  const coords = []
  let turn = 1
  const coordsEndRef = useRef(null)

  const scrollToBottom = () => {
    coordsEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [coords])

  for (let i = 0; i < props.coords.length; i++) {
    if (i % 2 !== 0) {
      if ((props.coords[i])[2] === 'W') {
        turn++
        const initialPiece = props.coords[i - 1].slice(2, 5)
        const destination = props.coords[i].slice(-2)
        const initialCoord = props.coords[i - 1].slice(5, 6)
        coords.push(
          <span
            key={i}
            className={'coords2 piece2 alignRight ' + initialPiece}> {initialCoord}X{destination}</span>)
      } else if ((props.coords[i])[2] === 'B') {
        turn++
        const initialCoord = props.coords[i - 1].slice(5, 6)
        const initialPiece = props.coords[i - 1].slice(2, 5)
        const destination = props.coords[i].slice(-2)
        coords.push(
          <span key={i} className='alignleft'> {turn / 2}
            <span
              className={'coords2 piece2 ' + initialPiece}> {initialCoord}X{destination}</span></span>)
      } else {
        const destination = props.coords[i].slice(3, props.coords[i].length)
        console.log(destination)
        let initialCoord = props.coords[i - 1].slice(5, 6)
        console.log(initialCoord)
        let initialPiece
        if (turn === 1) {
          initialPiece = props.coords[i - 1].slice(0, 3)
        } else {
          initialPiece = props.coords[i - 1].slice(2, 5)
        }
        turn++
        if (initialPiece[2] === 'P') {
          initialPiece = ''
          initialCoord = ''
          if (turn % 2 === 0) {
            coords.push(
              <span key={i} className='alignleft'> {turn / 2}
                <span
                  className={'coords piece2 ' + initialPiece + ' ' + destination}> {initialCoord}{destination}</span></span>)
          } else {
            coords.push(
              <span
                key={i}
                className={'coords alignRight piece2 ' + initialPiece + ' ' + destination}> {initialCoord}{destination}</span>)
          }
        } else {
          if (turn % 2 === 0) {
            coords.push(
              <span key={i} className='alignleft'> {turn / 2}
                <span
                  className={'coords3 piece2 ' + initialPiece + ' ' + destination}>{initialCoord}{destination}</span></span>)
          } else {
            coords.push(
              <span
                key={i}
                className={'coords3 alignRight piece2 ' + initialPiece + ' ' + destination}>{initialCoord}{destination}</span>)
          }
        }
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
