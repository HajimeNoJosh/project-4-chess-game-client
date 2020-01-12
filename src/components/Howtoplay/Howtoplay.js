import React from 'react'

const Howtoplay = props => {
  return (
    <span>
    There are several rules in chess. This simple explanation will get you started.
      <br/>
    First thing to keep in mind is point values of each piece.
      <table>
        <thead>
          <tr>
            <th>Chess Pieces</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece2 WhQ'></span>
                <span className='squaretable piece2 BlQ'> </span>
              </div>
            </td>
            <td>Queen (9)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece2 WhR'></span>
                <span className='squaretable piece2 BlR'> </span>
              </div>
            </td>
            <td>Rook (5)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece2 WhB'></span>
                <span className='squaretable piece2 BlB'> </span>
              </div>
            </td>
            <td>Bishop (3)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece2 WhN'></span>
                <span className='squaretable piece2 BlN'> </span>
              </div>
            </td>
            <td>Knight (3)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece2 WhP'></span>
                <span className='squaretable piece2 BlP'> </span>
              </div>
            </td>
            <td>Pawn (1)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece2 WhK'></span>
                <span className='squaretable piece2 BlK'> </span>
              </div>
            </td>
            <td>King (The Game)</td>
          </tr>
        </tbody>
      </table>
      <h6>Game will immediatly end if King is taken, and will send update to API, otherwise make sure to submit before quitting the game </h6>
      <h6>Pawn promotions are only to queen at the moment</h6>
      <h6>Cannot Castle or en Passant</h6>
    </span>
  )
}

export default Howtoplay
