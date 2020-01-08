import React from 'react'

const Home = props => {
  return (
    <div>
      <h4 className='center'>Welcome to HajimeNoChess</h4>

      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1 className='center chesstitle'> Chess </h1>

            <p> Welcome to HajimeNoChess. This is a project completed by Josh Martin while
                attending General Assemblies Software Engineering Immersive. To get started
                sign up with an a throw away account. At the moment there is no security, and
                breaches can occur. After you have signed up the site will sign you in. From there
                you will be greeted with a new home page. </p>
          </div>
          <div className="col-sm-6">
            <h1 className='center gamesplayedtitle'>Join Now</h1>
            <a href="#sign-in" className='center button'>Sign In</a>
            <a href="#sign-up" className='center button'>Sign Up</a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
