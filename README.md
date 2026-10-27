# PyPath - Interactive Python Learning Hub

PyPath is a beginner-friendly learning website built step by step. Learners can
study Python basics, answer quizzes, complete coding challenges, and practise
Python in a browser-based playground.

## Technology stack

### Used in the current frontend

- **HTML5** structures the pages and learning content.
- **CSS3** styles the interface and makes it responsive.
- **JavaScript** handles navigation, quiz feedback, challenge checking, and
  communication with the Python runtime.
- **Pyodide** runs Python in the learner's browser. The current playground
  loads Pyodide from its official CDN and does not send learner code to a
  Python server.

### Planned as the project grows

- **Python** and **Django** are now used for the initial backend scaffold.
- **Django** will provide the backend framework for accounts, lessons, quizzes,
  and learner progress as those features are added.
- **MySQL** will store application data, accessed through Django's ORM. SQL
  will also be learned and practised as part of database development.

The backend runs separately from the current static frontend. Its first
`/health/` endpoint confirms Django is responding. MySQL, accounts, and lesson
APIs are not configured yet.

## Run the current website

1. Open this folder in Visual Studio Code.
2. Open `index.html` in a browser.
3. Keep an internet connection available while Pyodide loads for the first time.
4. Open the lesson, then use **Load challenge** in the playground to try the
   add-two-numbers exercise.

No separate Python installation is needed for the current browser playground.
The Django backend does require Python and the dependencies in
`requirements.txt`.

## Run the Django backend locally

Open PowerShell in the project folder and run:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
cd backend
..\.venv\Scripts\python.exe manage.py test core
..\.venv\Scripts\python.exe manage.py runserver
```

Open `http://127.0.0.1:8000/health/` in your browser. The response should be
JSON with `"status": "ok"`. Stop the local server with **Ctrl+C**.

The `.venv` folder contains this project's isolated Python packages and is
ignored by Git. The backend currently uses Django's local SQLite development
database setting; MySQL will be configured in a later database milestone.
The static frontend is still opened separately from `index.html`.

## Project files

- `index.html` - homepage, first lesson, quiz, challenge, and playground.
- `style.css` - page styles and responsive layout.
- `script.js` - interactive behaviour and Pyodide integration.
- `requirements.txt` - Python backend dependencies.
- `backend/` - Django project and its first `core` app.

## Lessons currently available

- **Lesson 1: Python basics** - `print()`, variables, strings, and numbers.
- **Lesson 2: Python operators** - arithmetic, division, remainders, powers,
  calculation order, and a short interactive quiz.
- **Lesson 3: Making decisions** - comparison operators, Boolean values,
  `if`/`elif`/`else`, and combining conditions.
- **Lesson 4: Python loops** - repeating instructions with `for`, `while`,
  and `range()`.
- **Lesson 5: Python collections** - creating and changing lists, using
  indexes, looping through items, and storing labelled values in dictionaries.
- **Lesson 6: Python functions** - defining and calling functions, parameters,
  arguments, and return values.
- **Lesson 7: Working with strings** - combining text, string methods,
  indexes, slices, and f-strings.
- **Lesson 8: Errors and exceptions** - reading errors and handling expected
  problems with `try`/`except`.
- **Lesson 9: Python files** - reading, writing, and appending text with
  context managers. Playground files are temporary and stay in Pyodide's
  browser-based file system.
- **Lesson 10: Object-oriented Python** - classes, objects, attributes,
  `__init__`, `self`, and methods.

## Development approach

The project is being built in small, testable milestones:

1. Frontend foundations with HTML, CSS, and JavaScript (complete).
2. Python lessons and browser-based practice with Pyodide (in progress).
3. Initial Django backend scaffold and health check (in progress).
4. MySQL data storage, authentication, and progress tracking.
5. Connect frontend pages to Django and build further exercises, projects,
   tests, and deployment.

Learner-submitted code should continue to run in the browser with Pyodide.
Do not run arbitrary learner code directly on the main Django server.

## Git commit convention

Make a small commit after each completed and tested feature. Use a short
imperative message that describes the change, for example:

```text
Add first Python lesson and browser playground
Add automatic number addition challenge
```

Keep development secrets out of GitHub. The current Django secret-key fallback
is for local development only and must be replaced with a secure environment
variable before deployment.
