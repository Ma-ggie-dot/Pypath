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

### Backend and data

- **Python** and **Django** serve the website, published lesson API, and
  optional server-side AI assistant.
- **SQLite** is used for local development. MySQL and user accounts are later
  milestones; learner progress is currently saved in this browser.

Learner-submitted Python continues to run only in the browser with Pyodide; it
is never executed on the Django server.

## Run the current website

1. Start the Django server using the commands below.
2. Open `http://127.0.0.1:8000/` in a browser.
3. Keep an internet connection available while Pyodide loads for the first time.
4. Explore lessons, quizzes, the debugging lab, mini-projects, and glossary.
5. Mark completed lessons to track progress in this browser and filter by
   **All lessons**, **To do**, or **Completed**.
6. The AI helper stays unavailable until a site owner configures its provider
   endpoint, model, and API key on the server.

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
..\.venv\Scripts\python.exe manage.py test lessons
..\.venv\Scripts\python.exe manage.py runserver
```

Open `http://127.0.0.1:8000/` for the integrated website, or
`http://127.0.0.1:8000/health/` to check the backend status. The health
response should be JSON with `"status": "ok"`. Stop the local server with
**Ctrl+C**.

The `.venv` folder contains this project's isolated Python packages and is
ignored by Git. The backend currently uses Django's local SQLite development
database setting; MySQL will be configured in a later database milestone.

## Optional AI helper setup

The AI helper calls an OpenAI-compatible chat-completions endpoint from Django.
The browser never receives the provider API key. To enable it, set these three
environment variables in the same PowerShell terminal before starting Django:

```powershell
$env:PYPATH_AI_ENDPOINT = "https://your-provider.example/v1/chat/completions"
$env:PYPATH_AI_MODEL = "your-model-name"
$env:PYPATH_AI_API_KEY = "your-private-key"
```

Use the endpoint and model name supplied by your AI provider. For local
development, an HTTP endpoint is allowed only on `localhost` or `127.0.0.1`;
remote endpoints must use HTTPS. Never paste an API key into source files,
HTML, JavaScript, GitHub, or chat. The helper accepts questions up to 1,200
characters and limits requests to five per minute per client IP. Questions are
sent to the configured provider, so learners should not submit private data.
Without all three settings, the rest of the website still works and the helper
clearly reports that it is not configured.

## Lesson API

The read-only `GET /api/lessons/` endpoint returns published lessons as JSON,
ordered by lesson number. Unpublished lessons are not included. The homepage
loads this endpoint to display a searchable lesson library; **Read lesson**
shows the content saved in Django. Lesson content is inserted as text, not
executed as HTML. Python code execution continues to run in the browser with
Pyodide. Completed lesson slugs are saved in the browser's local storage, so
progress remains on this device and is not synced to an account or backend.
The lesson library can be filtered by all lessons, completed lessons, or
lessons still to do.

The optional `GET /api/assistant/status/` endpoint reports only whether all
server-side AI settings are present; it never returns secrets. The
CSRF-protected `POST /api/assistant/` endpoint accepts a JSON `question` and
returns an `answer` from the configured provider.

Run the API tests from the `backend` folder with:

```powershell
..\.venv\Scripts\python.exe manage.py test core lessons
```

## Project files

- `index.html` - homepage, lessons, debugging lab, projects, glossary, AI helper,
  quizzes, and playground.
- `style.css` - page styles and responsive layout.
- `script.js` - interactive behaviour, browser progress, and Pyodide integration.
- `requirements.txt` - Python backend dependencies.
- `backend/` - Django project with `core` and `lessons` apps.

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
3. Django backend, published lesson catalog, and browser-based progress
   (complete for the local MVP).
4. Debugging lab, mini-projects, searchable glossary, and optional AI proxy
   (local MVP).
5. MySQL, user accounts, server-synced progress, and deployment (future work).

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
