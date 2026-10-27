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

- **Python** will be used to develop the backend.
- **Django** will provide the backend web framework for accounts, lessons,
  quizzes, and learner progress.
- **MySQL** will store application data, accessed through Django's ORM. SQL
  will also be learned and practised as part of database development.

The backend and database are planned stages; they are not part of the current
static frontend.

## Run the current website

1. Open this folder in Visual Studio Code.
2. Open `index.html` in a browser.
3. Keep an internet connection available while Pyodide loads for the first time.
4. Open the lesson, then use **Load challenge** in the playground to try the
   add-two-numbers exercise.

No separate Python installation is needed for the current browser playground.

## Project files

- `index.html` - homepage, first lesson, quiz, challenge, and playground.
- `style.css` - page styles and responsive layout.
- `script.js` - interactive behaviour and Pyodide integration.

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
3. A Python and Django backend.
4. MySQL data storage, authentication, and progress tracking.
5. Further exercises, projects, testing, and deployment.

Learner-submitted code should continue to run in the browser with Pyodide.
Do not run arbitrary learner code directly on the main Django server.

## Git commit convention

Make a small commit after each completed and tested feature. Use a short
imperative message that describes the change, for example:

```text
Add first Python lesson and browser playground
Add automatic number addition challenge
```

Before sharing the project on GitHub, choose whether the repository should be
public or private and confirm the GitHub repository URL.
