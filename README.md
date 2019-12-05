# Project-4-chess-game-client
![Website](https://i.imgur.com/iTFc4hk.jpg)

[API](https://stark-citadel-18124.herokuapp.com)

[Website]( https://hajimenojosh.github.io/project-4-chess-game-client/)

[API Github](https://github.com/HajimeNoJosh/project-4-chess-game-API)

This App is a chess game app that stores users moves and can update an API with
those moves.

In the beginning my main goal was to create a form that could take in chess
coordinates and update an array in my express backend for a signed in user. The
user would access this form by creating a game. This user could then view those
'games' and delete them if they wanted. This was when I reached my first hiccup
and needed to figure out how to store multiple updates without replacing the
whole array. This was solved by copying the already made array into a varibale,
updating that varible and storing that varible into my state of coords that I
could send to my API.

My project began to develop from there. I began focus on creating a game board,
which I did by seperating out two new components Board and Square so that I could
create a board that is filled with individual squares that have certain traits.
This is when I hit a new snag. I was able to fill up the board just fine, but
updating the state of the board proved to be difficult. I created an array
of the initital state of the board, that way the board would rerender if I clicked
on a piece.

When I was able to do this, I began to work on logic for chess, and this is where
the project currently stands. It is lacking in some of the fundamental rules of chess.
  1. Pieces can jump other pieces (of course Knight will still able to when I do program this)
  2. Promotion should be taken into account
  3. Checks/Checkmate

I would also like to work on things outside of game logic, including styling and API work
  1. Home screen that explains the rules of chess
  2. Storing the state of the game board so when I view games I can also render a board

```
MVP User Stories

As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As a signed in user, I would like to be able to create a chess game.
As a signed in user, I would like to be able to create chess coordinates (F6, NF3 etc...).
As a signed in user in a room, I would like to see all my chess games.
As a signed in user in a room, I would like to see all my chess coordinates for one chess game.
As a signed in user in a room, I would like to update my own chess coordinates.
As a signed in user in a room, I would like to delete my own chess games.
```


![wireframe](https://media.git.generalassemb.ly/user/23013/files/f1336e00-14e4-11ea-9974-e87180472705)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites

Install dependencies with npm install.

## Built With

* [ReactJS](https://reactjs.org/) - The library used


## Authors
* **Joshuah Martin** - [HajimeNoJosh](https://github.com/HajimeNoJosh)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
