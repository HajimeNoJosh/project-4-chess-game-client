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
                <span className='squaretable piece WhQ'></span>
                <span className='squaretable piece BlQ'> </span>
              </div>
            </td>
            <td>Queen (9)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece WhR'></span>
                <span className='squaretable piece BlR'> </span>
              </div>
            </td>
            <td>Rook (5)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece WhB'></span>
                <span className='squaretable piece BlB'> </span>
              </div>
            </td>
            <td>Bishop (3)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece WhN'></span>
                <span className='squaretable piece BlN'> </span>
              </div>
            </td>
            <td>Knight (3)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece WhP'></span>
                <span className='squaretable piece BlP'> </span>
              </div>
            </td>
            <td>Pawn (1)</td>
          </tr>
          <tr>
            <td scope='row'>
              <div className='overall'>
                <span className='squaretable piece WhK'></span>
                <span className='squaretable piece BlK'> </span>
              </div>
            </td>
            <td>King (The Game)</td>
          </tr>
        </tbody>
      </table>
    </span>
  )
}

export default Howtoplay
