## Sudoku web app

https://github.com/edwilson543/sudoku/assets/102787343/04161d2b-a238-4b37-9286-4d79fd509f7d

---

### Repo setup
Clone the repo
```bash
git clone git@github.com:edwilson543/sudoku.git
cd sudoku
```

Copy the example .env files
```bash
cp frontend/.env.example frontend/.env
cp backend/sudoku/.env.example backend/sudoku/.env
```
In `frontend/.env` comment out on of the with / without docker sections as relevant

### DB setup:
#### System requirements:
- postgres 14.9
```bash
createdb sudoku
```

### App setup (with docker):
#### System requirements:
- Docker 20.10.20

### Running:
```
docker-compose build
docker-compose up
```

### App setup (without docker):
#### System requirements:
- Python 3.11
- Node 18.16

#### Installation:
Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements/app-requirements.txt
python manage.py migrate
```
Frontend:
```bash
cd frontend
npm install
```

#### Running:
In one shell:
```bash
cd backend
python manage.py runserver 8000
```
In another shell:
```bash
npm start
```
Then visit [your localhost](http://localhost:3000/) to play.

There's also a [django admin](http://localhost:8000/) which shows all players, games, sudokus and game moves.

---

## Tech stack:
- React for the frontend
- Django for the backend
- Django REST framework for the API allowing them to communicate

---

## Features:
- Gameplay
  - Make, erase & undo moves
  - Validation mode (highlights incorrect guesses when turned on)
  - Play sudokus of different sizes and varying difficulties
  - Light & dark themes
- Backend
  - Sudoku solver using integer programming
  - Sudoku generation - the algorithm I came up with is:
    - Randomly shuffle a solved sudoku, ensuring the solution remains valid
    - Randomly remove a certain number of clues
    - Attempt solving the sudoku and check that the solution is unique
  - Player identification
  - Persistence of current game state and historic games
