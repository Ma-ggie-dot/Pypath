
const startButton = document.getElementById("startButton");
const learnButton = document.getElementById("learnButton");
const exploreButton = document.getElementById("exploreButton");
const checkQuizButton = document.getElementById("checkQuizButton");
const quizFeedback = document.getElementById("quizFeedback");
const checkOperatorQuizButton = document.getElementById("checkOperatorQuizButton");
const operatorQuizFeedback = document.getElementById("operatorQuizFeedback");
const loadOperatorExampleButton = document.getElementById("loadOperatorExampleButton");
const checkConditionQuizButton = document.getElementById("checkConditionQuizButton");
const conditionQuizFeedback = document.getElementById("conditionQuizFeedback");
const loadConditionExampleButton = document.getElementById("loadConditionExampleButton");
const checkLoopQuizButton = document.getElementById("checkLoopQuizButton");
const loopQuizFeedback = document.getElementById("loopQuizFeedback");
const loadLoopExampleButton = document.getElementById("loadLoopExampleButton");
const checkCollectionQuizButton = document.getElementById("checkCollectionQuizButton");
const collectionQuizFeedback = document.getElementById("collectionQuizFeedback");
const loadCollectionExampleButton = document.getElementById("loadCollectionExampleButton");
const checkFunctionQuizButton = document.getElementById("checkFunctionQuizButton");
const functionQuizFeedback = document.getElementById("functionQuizFeedback");
const loadFunctionExampleButton = document.getElementById("loadFunctionExampleButton");
const checkStringQuizButton = document.getElementById("checkStringQuizButton");
const stringQuizFeedback = document.getElementById("stringQuizFeedback");
const loadStringExampleButton = document.getElementById("loadStringExampleButton");
const checkErrorQuizButton = document.getElementById("checkErrorQuizButton");
const errorQuizFeedback = document.getElementById("errorQuizFeedback");
const loadErrorExampleButton = document.getElementById("loadErrorExampleButton");
const checkFileQuizButton = document.getElementById("checkFileQuizButton");
const fileQuizFeedback = document.getElementById("fileQuizFeedback");
const loadFileExampleButton = document.getElementById("loadFileExampleButton");
const checkObjectQuizButton = document.getElementById("checkObjectQuizButton");
const objectQuizFeedback = document.getElementById("objectQuizFeedback");
const loadObjectExampleButton = document.getElementById("loadObjectExampleButton");
const pythonCode = document.getElementById("pythonCode");
const runCodeButton = document.getElementById("runCodeButton");
const resetCodeButton = document.getElementById("resetCodeButton");
const loadChallengeButton = document.getElementById("loadChallengeButton");
const checkChallengeButton = document.getElementById("checkChallengeButton");
const challengeFeedback = document.getElementById("challengeFeedback");
const playgroundStatus = document.getElementById("playgroundStatus");
const pythonOutput = document.getElementById("pythonOutput");

const starterCode = pythonCode.value;
const lessonSearch = document.getElementById("lessonSearch");
const clearLessonSearchButton = document.getElementById("clearLessonSearchButton");
const lessonCatalogEmpty = document.getElementById("lessonCatalogEmpty");
const lessonProgressText = document.getElementById("lessonProgressText");
const lessonProgressStatus = document.getElementById("lessonProgressStatus");
const lessonProgressBar = document.querySelector(".progress-track");
const lessonProgressFill = document.getElementById("lessonProgressBar");
const markLessonCompleteButton = document.getElementById("markLessonCompleteButton");
const closeLessonButton = document.getElementById("closeLessonButton");
const lessonProgressFilters = document.querySelectorAll("[data-progress-filter]");
const debugExerciseSelect = document.getElementById("debugExerciseSelect");
const debugExercisePrompt = document.getElementById("debugExercisePrompt");
const debugCode = document.getElementById("debugCode");
const runDebugButton = document.getElementById("runDebugButton");
const checkDebugButton = document.getElementById("checkDebugButton");
const resetDebugButton = document.getElementById("resetDebugButton");
const debugStatus = document.getElementById("debugStatus");
const debugOutput = document.getElementById("debugOutput");
const glossarySearch = document.getElementById("glossarySearch");
const glossaryCatalog = document.getElementById("glossaryCatalog");
const glossaryEmpty = document.getElementById("glossaryEmpty");
const projectCatalog = document.getElementById("projectCatalog");
const projectLoadStatus = document.getElementById("projectLoadStatus");
const assistantForm = document.getElementById("assistantForm");
const assistantQuestion = document.getElementById("assistantQuestion");
const askAssistantButton = document.getElementById("askAssistantButton");
const assistantStatus = document.getElementById("assistantStatus");
const assistantAnswer = document.getElementById("assistantAnswer");
let publishedLessonCards = [];
let currentLesson = null;
let currentProgressFilter = "all";
let completedLessonSlugs = new Set();
const lessonProgressStorageKey = "pypath.completedLessons";
const operatorExampleCode = `# Change the prices and run the calculation
first_price = 120
second_price = 80
total = first_price + second_price
print(total)
`;
const conditionExampleCode = `# Change the score and run the program
score = 75

if score >= 50:
    print("You passed")
else:
    print("Keep practising")
`;
const loopExampleCode = `# Print the numbers from 1 through 5
for number in range(1, 6):
    print(number)
`;
const collectionExampleCode = `# Add a fruit, then print every item in the list
fruits = ["mango", "banana", "orange"]
fruits.append("pineapple")

for fruit in fruits:
    print(fruit)
`;
const functionExampleCode = `def add_numbers(first, second):
    return first + second

answer = add_numbers(8, 5)
print(answer)
`;
const stringExampleCode = `name = "Amina"
lessons = 7

print(f"{name} has studied {lessons} lessons.")
print(name.upper())
`;
const errorExampleCode = `text = "hello"

try:
    number = int(text)
except ValueError:
    print("Please enter a whole number.")
else:
    print("You entered", number)
`;
const fileExampleCode = `with open("notes.txt", "w") as file:
    file.write("My first Python file")

with open("notes.txt", "r") as file:
    print(file.read())
`;
const objectExampleCode = `class Learner:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print("Hello,", self.name)

learner = Learner("Amina")
learner.greet()
`;
const challengeCode = `# Set the two numbers
first_number = 8
second_number = 5

# Add the numbers and display the answer
`;
let pyodide;
let challengeMode = false;

const debugExercises = {
    name: {
        prompt: 'The program should say "Hello, Amina!" Fix the misspelled variable.',
        code: 'learner_name = "Amina"\nprint("Hello,", learn_name + "!")',
        expected: "Hello, Amina!",
    },
    syntax: {
        prompt: "The learner passes when their score is at least 50. Repair the if statement.",
        code: "score = 72\n\nif score >= 50\n    print('You passed')\nelse:\n    print('Keep practising')",
        expected: "You passed",
    },
    loop: {
        prompt: "The loop should print every whole number from 1 through 5. Fix its range.",
        code: "for number in range(1, 5):\n    print(number)",
        expected: "1\n2\n3\n4\n5",
    },
};

const glossaryTerms = [
    { term: "Argument", definition: "A value passed into a function when it is called.", example: 'greet("Amina")  # "Amina" is an argument' },
    { term: "Boolean", definition: "A value that is either True or False.", example: "is_ready = True" },
    { term: "Class", definition: "A blueprint that describes data and behaviour for objects.", example: "class Learner:\n    pass" },
    { term: "Condition", definition: "A test that evaluates to True or False and controls a decision.", example: "if score >= 50:\n    print('Pass')" },
    { term: "Dictionary", definition: "A collection that stores values using named keys.", example: 'learner = {"name": "Amina"}' },
    { term: "Exception", definition: "An event raised when Python encounters an error while a program runs.", example: "try:\n    number = int(text)\nexcept ValueError:\n    print('Try a number')" },
    { term: "Expression", definition: "Code that Python evaluates to produce a value.", example: "total = 4 + 5" },
    { term: "Function", definition: "A named, reusable block of code that can accept input and return a result.", example: "def greet(name):\n    return 'Hello, ' + name" },
    { term: "Index", definition: "A number that identifies an item's position; Python sequences start at index 0.", example: 'colors = ["purple", "blue"]\nprint(colors[0])' },
    { term: "Integer", definition: "A whole number without a decimal part.", example: "lesson_count = 10" },
    { term: "Iteration", definition: "One pass through a repeated block of code, such as a loop body.", example: "for fruit in fruits:\n    print(fruit)" },
    { term: "List", definition: "An ordered collection that can hold several values.", example: 'fruits = ["mango", "banana"]' },
    { term: "Loop", definition: "A structure that repeats instructions while a condition holds or for each item.", example: "for number in range(3):\n    print(number)" },
    { term: "Method", definition: "A function associated with an object, called using dot notation.", example: '"hello".upper()' },
    { term: "Object", definition: "A value created from a class that can hold data and provide methods.", example: "learner = Learner()" },
    { term: "Parameter", definition: "A variable in a function definition that receives an argument.", example: "def greet(name):  # name is a parameter\n    print(name)" },
    { term: "Return value", definition: "The result a function sends back to the code that called it.", example: "def add(a, b):\n    return a + b" },
    { term: "String", definition: "A sequence of text characters written inside quotes.", example: 'message = "Hello, Python!"' },
    { term: "Syntax", definition: "The rules for writing valid code in a programming language.", example: "print('Parentheses and quotes must match')" },
    { term: "Variable", definition: "A name that refers to a value so the program can use it later.", example: 'learner_name = "Amina"' },
];

const miniProjects = [
    {
        title: "Personal greeting card",
        level: "Beginner · variables and strings",
        description: "Create a friendly message using a name, course, and formatted output.",
        steps: ["Change the example details.", "Use an f-string to build a greeting.", "Print a second line about your learning goal."],
        code: 'name = "Amina"\ncourse = "Python"\ngoal = "build useful projects"\n\nprint(f"Hello, {name}!")\nprint(f"I am learning {course} to {goal}.")',
    },
    {
        title: "Number guessing game",
        level: "Beginner · loops and conditions",
        description: "Practise repeating a check and responding to a correct guess.",
        steps: ["Change the secret number.", "Change the guesses list.", "Print a success message when a guess matches."],
        code: "secret_number = 7\nguesses = [3, 5, 7, 9]\n\nfor guess in guesses:\n    print(f\"Trying {guess}...\")\n    if guess == secret_number:\n        print(\"You found it!\")\n        break",
    },
    {
        title: "Simple expense tracker",
        level: "Beginner · lists and arithmetic",
        description: "Store a few expenses and calculate their total and average.",
        steps: ["Add or change the expense amounts.", "Calculate the total with sum().", "Calculate and print the average."],
        code: 'expenses = [120, 80, 45]\ntotal = sum(expenses)\naverage = total / len(expenses)\n\nprint("Expenses:", expenses)\nprint("Total:", total)\nprint("Average:", average)',
    },
];

function updateLessonProgress() {
    const completedCount = publishedLessonCards.filter(({ lesson }) =>
        completedLessonSlugs.has(lesson.slug)
    ).length;
    const totalLessons = publishedLessonCards.length;
    const percentage = totalLessons === 0 ? 0 : (completedCount / totalLessons) * 100;

    lessonProgressText.textContent = `${completedCount} of ${totalLessons} lessons completed`;
    lessonProgressBar.setAttribute("aria-valuemax", String(totalLessons));
    lessonProgressBar.setAttribute("aria-valuenow", String(completedCount));
    lessonProgressFill.style.width = `${percentage}%`;

    publishedLessonCards.forEach(({ card, lesson }) => {
        const isCompleted = completedLessonSlugs.has(lesson.slug);
        card.querySelector(".lesson-completed-badge").hidden = !isCompleted;
    });

    filterLessonCards();

    if (currentLesson) {
        const isCompleted = completedLessonSlugs.has(currentLesson.slug);
        markLessonCompleteButton.textContent = isCompleted
            ? "Mark as not complete"
            : "Mark lesson complete";
        markLessonCompleteButton.setAttribute("aria-pressed", String(isCompleted));
    }
}

function renderGlossary(terms) {
    glossaryCatalog.replaceChildren();

    terms.forEach(({ term, definition, example }) => {
        const card = document.createElement("article");
        card.className = "lesson-card glossary-card";

        const heading = document.createElement("h3");
        heading.textContent = term;

        const description = document.createElement("p");
        description.textContent = definition;

        const code = document.createElement("pre");
        code.className = "example-code";
        code.textContent = example;

        card.append(heading, description, code);
        glossaryCatalog.append(card);
    });

    glossaryEmpty.hidden = terms.length > 0;
}

function renderProjects() {
    miniProjects.forEach((project) => {
        const card = document.createElement("article");
        card.className = "lesson-card project-card";

        const level = document.createElement("p");
        level.className = "challenge-label";
        level.textContent = project.level;

        const heading = document.createElement("h3");
        heading.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const steps = document.createElement("ol");
        steps.className = "project-steps";
        project.steps.forEach((step) => {
            const item = document.createElement("li");
            item.textContent = step;
            steps.append(item);
        });

        const button = document.createElement("button");
        button.className = "secondary-button";
        button.type = "button";
        button.textContent = "Load starter in playground";
        button.addEventListener("click", function () {
            pythonCode.value = project.code;
            challengeMode = false;
            setChallengeFeedback("", "");
            playgroundStatus.textContent = `${project.title} starter loaded. Edit the code, then select Run Python.`;
            pythonOutput.textContent = "Starter loaded. Complete the project steps, then run your code.";
            projectLoadStatus.textContent = `${project.title} loaded in the code playground.`;
            document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
            pythonCode.focus();
        });

        card.append(level, heading, description, steps, button);
        projectCatalog.append(card);
    });
}

function loadDebugExercise() {
    const exercise = debugExercises[debugExerciseSelect.value];
    debugStatus.classList.remove("feedback-success", "feedback-error");
    debugCode.value = exercise.code;
    debugExercisePrompt.textContent = exercise.prompt;
    debugStatus.textContent = pyodide
        ? "Read the code, run it to inspect the error or output, then make a fix."
        : "Loading the browser Python runtime...";
    debugOutput.textContent = "Select Run code to inspect the broken program.";
}

async function checkAssistantStatus() {
    try {
        const response = await fetch("/api/assistant/status/");
        const data = await response.json();
        if (!response.ok || typeof data.configured !== "boolean") {
            throw new Error(data.error || "The assistant status response was invalid.");
        }

        if (data.configured) {
            askAssistantButton.disabled = false;
            askAssistantButton.textContent = "Ask for an explanation";
            assistantStatus.textContent = "Assistant ready. Your question will be sent to the configured AI provider.";
        } else {
            askAssistantButton.disabled = true;
            askAssistantButton.textContent = "Assistant not configured";
            assistantStatus.textContent = "AI support is not configured yet. A site owner must set the provider endpoint, model, and API key on the server.";
        }
    } catch (error) {
        askAssistantButton.disabled = true;
        askAssistantButton.textContent = "Assistant unavailable";
        assistantStatus.textContent = `Could not check the assistant setup: ${error.message}`;
        console.error("Could not check AI assistant status:", error);
    }
}

async function askAssistant(question) {
    const csrfToken = assistantForm.querySelector("[name=csrfmiddlewaretoken]").value;
    askAssistantButton.disabled = true;
    askAssistantButton.textContent = "Thinking...";
    assistantStatus.textContent = "Sending your question to the configured assistant...";
    assistantAnswer.textContent = "";

    try {
        const response = await fetch("/api/assistant/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({ question }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || `The assistant returned HTTP ${response.status}.`);
        }
        if (typeof data.answer !== "string" || data.answer.trim() === "") {
            throw new Error("The assistant returned an empty explanation.");
        }

        assistantAnswer.textContent = data.answer;
        assistantStatus.textContent = "Explanation ready.";
    } catch (error) {
        assistantAnswer.textContent = "The explanation could not be loaded.";
        assistantStatus.textContent = error.message;
        console.error("Could not get an AI explanation:", error);
    } finally {
        askAssistantButton.disabled = false;
        askAssistantButton.textContent = "Ask for an explanation";
    }
}

function filterLessonCards() {
    if (publishedLessonCards.length === 0) {
        lessonCatalogEmpty.hidden = true;
        return;
    }

    const searchTerm = lessonSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    publishedLessonCards.forEach(({ card, lesson }) => {
        const isCompleted = completedLessonSlugs.has(lesson.slug);
        const matchesSearch = `${lesson.title} ${lesson.description}`.toLowerCase().includes(searchTerm);
        const matchesProgress = currentProgressFilter === "all" ||
            (currentProgressFilter === "completed" && isCompleted) ||
            (currentProgressFilter === "incomplete" && !isCompleted);

        card.hidden = !matchesSearch || !matchesProgress;
        if (!card.hidden) {
            visibleCount += 1;
        }
    });

    lessonCatalogEmpty.hidden = visibleCount > 0;
    if (visibleCount === 0) {
        lessonCatalogEmpty.textContent = currentProgressFilter === "completed" && searchTerm === ""
            ? "No completed lessons yet. Open a lesson and mark it complete to see it here."
            : currentProgressFilter === "incomplete" && searchTerm === ""
                ? "You have completed every published lesson."
                : "No lessons match these filters. Try another search or progress filter.";
    }

    const progressLabel = currentProgressFilter === "all"
        ? "all lessons"
        : currentProgressFilter === "completed"
            ? "completed lessons"
            : "lessons to do";
    document.getElementById("lessonCatalogStatus").textContent =
        `Showing ${visibleCount} of ${publishedLessonCards.length} ${progressLabel}.`;
}

function restoreLessonProgress(lessons) {
    try {
        const savedProgress = localStorage.getItem(lessonProgressStorageKey);
        if (savedProgress === null) {
            return;
        }

        const savedSlugs = JSON.parse(savedProgress);
        if (!Array.isArray(savedSlugs) || savedSlugs.some((slug) => typeof slug !== "string")) {
            throw new Error("Saved lesson progress has an invalid format.");
        }

        const publishedSlugs = new Set(lessons.map((lesson) => lesson.slug));
        completedLessonSlugs = new Set(savedSlugs.filter((slug) => publishedSlugs.has(slug)));
    } catch (error) {
        lessonProgressStatus.textContent = `Could not load saved progress: ${error.message}`;
        console.error("Could not load saved lesson progress:", error);
    }
}

async function loadPublishedLessons() {
    const status = document.getElementById("lessonCatalogStatus");
    const catalog = document.getElementById("lessonCatalog");
    const selectedLesson = document.getElementById("selectedLesson");
    const selectedLessonTitle = document.getElementById("selectedLessonTitle");
    const selectedLessonDescription = document.getElementById("selectedLessonDescription");
    const selectedLessonContent = document.getElementById("selectedLessonContent");

    try {
        const response = await fetch("/api/lessons/");
        if (!response.ok) {
            throw new Error(`The lessons API returned HTTP ${response.status}.`);
        }

        const data = await response.json();
        if (!Array.isArray(data.lessons)) {
            throw new Error("The lessons API response did not contain a lessons list.");
        }

        catalog.replaceChildren();
        publishedLessonCards = [];

        if (data.lessons.length === 0) {
            status.textContent = "There are no published lessons yet. Publish lessons in Django admin to show them here.";
            lessonSearch.disabled = true;
            updateLessonProgress();
            return;
        }

        restoreLessonProgress(data.lessons);

        data.lessons.forEach((lesson) => {
            if (
                typeof lesson.title !== "string" ||
                typeof lesson.slug !== "string" ||
                typeof lesson.description !== "string" ||
                typeof lesson.content !== "string" ||
                typeof lesson.order !== "number"
            ) {
                throw new Error("A lesson from the API is missing its title, description, content, or order.");
            }

            const card = document.createElement("article");
            card.className = "lesson-card lesson-catalog-card";

            const number = document.createElement("span");
            number.className = "lesson-number";
            number.textContent = `LESSON ${String(lesson.order).padStart(2, "0")}`;

            const completedBadge = document.createElement("span");
            completedBadge.className = "lesson-completed-badge";
            completedBadge.textContent = "Completed";
            completedBadge.hidden = true;

            const metadata = document.createElement("div");
            metadata.className = "lesson-card-meta";
            metadata.append(number, completedBadge);

            const heading = document.createElement("h3");
            heading.textContent = lesson.title;

            const description = document.createElement("p");
            description.textContent = lesson.description;

            const button = document.createElement("button");
            button.className = "secondary-button";
            button.type = "button";
            button.textContent = "Read lesson";
            button.addEventListener("click", function () {
                currentLesson = lesson;
                selectedLessonTitle.textContent = lesson.title;
                selectedLessonDescription.textContent = lesson.description;
                selectedLessonContent.textContent = lesson.content;
                selectedLesson.hidden = false;
                updateLessonProgress();
                selectedLesson.focus();
            });

            card.append(metadata, heading, description, button);

            catalog.append(card);
            publishedLessonCards.push({ card, lesson });
        });

        lessonSearch.disabled = false;
        clearLessonSearchButton.disabled = true;
        status.textContent = `${data.lessons.length} published lessons ready to explore.`;
        updateLessonProgress();
    } catch (error) {
        status.textContent = `Could not load lessons from Django: ${error.message} Check that the backend is running, then refresh this page.`;
        console.error("Could not load published lessons:", error);
    }
}

lessonSearch.addEventListener("input", function () {
    const searchTerm = lessonSearch.value.trim();
    clearLessonSearchButton.disabled = searchTerm.length === 0;
    filterLessonCards();
});

glossarySearch.addEventListener("input", function () {
    const searchTerm = glossarySearch.value.trim().toLowerCase();
    const matchingTerms = glossaryTerms.filter(({ term, definition, example }) =>
        `${term} ${definition} ${example}`.toLowerCase().includes(searchTerm)
    );
    renderGlossary(matchingTerms);
});

debugExerciseSelect.addEventListener("change", loadDebugExercise);

resetDebugButton.addEventListener("click", loadDebugExercise);

runDebugButton.addEventListener("click", function () {
    runDebugExercise(false);
});

checkDebugButton.addEventListener("click", function () {
    runDebugExercise(true);
});

assistantForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const question = assistantQuestion.value.trim();
    if (question.length === 0) {
        assistantStatus.textContent = "Enter a Python question first.";
        return;
    }

    askAssistant(question);
});

lessonProgressFilters.forEach((filterButton) => {
    filterButton.addEventListener("click", function () {
        currentProgressFilter = filterButton.dataset.progressFilter;
        lessonProgressFilters.forEach((button) => {
            const isActive = button === filterButton;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        filterLessonCards();
    });
});

clearLessonSearchButton.addEventListener("click", function () {
    lessonSearch.value = "";
    lessonSearch.dispatchEvent(new Event("input", { bubbles: true }));
    lessonSearch.focus();
});

markLessonCompleteButton.addEventListener("click", function () {
    if (!currentLesson) {
        return;
    }

    const wasCompleted = completedLessonSlugs.has(currentLesson.slug);
    if (wasCompleted) {
        completedLessonSlugs.delete(currentLesson.slug);
    } else {
        completedLessonSlugs.add(currentLesson.slug);
    }

    try {
        localStorage.setItem(lessonProgressStorageKey, JSON.stringify([...completedLessonSlugs]));
        lessonProgressStatus.textContent = "Progress is saved in this browser.";
        updateLessonProgress();
    } catch (error) {
        if (wasCompleted) {
            completedLessonSlugs.add(currentLesson.slug);
        } else {
            completedLessonSlugs.delete(currentLesson.slug);
        }
        lessonProgressStatus.textContent = `Could not save your progress: ${error.message}`;
        console.error("Could not save lesson progress:", error);
    }
});

closeLessonButton.addEventListener("click", function () {
    document.getElementById("selectedLesson").hidden = true;
    currentLesson = null;
});

startButton.addEventListener("click", function () {
    document.getElementById("lessonLibrary").scrollIntoView({ behavior: "smooth" });
});

learnButton.addEventListener("click", function () {
    document.getElementById("lessonLibrary").scrollIntoView({ behavior: "smooth" });
});

exploreButton.addEventListener("click", function () {
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
});

checkQuizButton.addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="quizAnswer"]:checked');

    quizFeedback.classList.remove("feedback-success", "feedback-error");

    if (!selectedAnswer) {
        quizFeedback.textContent = "Choose an answer first.";
        quizFeedback.classList.add("feedback-error");
        return;
    }

    if (selectedAnswer.value === "b") {
        quizFeedback.textContent = "Correct! print(5) displays the number 5.";
        quizFeedback.classList.add("feedback-success");
    } else {
        quizFeedback.textContent = 'Not quite. Use print(5) to display the number 5 without quotes.';
        quizFeedback.classList.add("feedback-error");
    }
});

checkOperatorQuizButton.addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="operatorQuizAnswer"]:checked');

    operatorQuizFeedback.classList.remove("feedback-success", "feedback-error");

    if (!selectedAnswer) {
        operatorQuizFeedback.textContent = "Choose an answer first.";
        operatorQuizFeedback.classList.add("feedback-error");
        return;
    }

    if (selectedAnswer.value === "b") {
        operatorQuizFeedback.textContent = "Correct! The % operator gives the remainder: 17 divided by 5 leaves 2.";
        operatorQuizFeedback.classList.add("feedback-success");
    } else {
        operatorQuizFeedback.textContent = "Not quite. The % operator gives the remainder left after division.";
        operatorQuizFeedback.classList.add("feedback-error");
    }
});

checkConditionQuizButton.addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="conditionQuizAnswer"]:checked');

    conditionQuizFeedback.classList.remove("feedback-success", "feedback-error");

    if (!selectedAnswer) {
        conditionQuizFeedback.textContent = "Choose an answer first.";
        conditionQuizFeedback.classList.add("feedback-error");
        return;
    }

    if (selectedAnswer.value === "b") {
        conditionQuizFeedback.textContent = "Correct! 12 is not greater than 20, so the comparison is False.";
        conditionQuizFeedback.classList.add("feedback-success");
    } else {
        conditionQuizFeedback.textContent = "Not quite. 12 is less than 20, so temperature > 20 is False.";
        conditionQuizFeedback.classList.add("feedback-error");
    }
});

checkLoopQuizButton.addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="loopQuizAnswer"]:checked');

    loopQuizFeedback.classList.remove("feedback-success", "feedback-error");

    if (!selectedAnswer) {
        loopQuizFeedback.textContent = "Choose an answer first.";
        loopQuizFeedback.classList.add("feedback-error");
        return;
    }

    if (selectedAnswer.value === "b") {
        loopQuizFeedback.textContent = "Correct! range(4) produces 0, 1, 2, and 3, so the loop runs 4 times.";
        loopQuizFeedback.classList.add("feedback-success");
    } else {
        loopQuizFeedback.textContent = "Not quite. range(4) starts at 0 and stops before 4.";
        loopQuizFeedback.classList.add("feedback-error");
    }
});

checkCollectionQuizButton.addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="collectionQuizAnswer"]:checked');

    collectionQuizFeedback.classList.remove("feedback-success", "feedback-error");

    if (!selectedAnswer) {
        collectionQuizFeedback.textContent = "Choose an answer first.";
        collectionQuizFeedback.classList.add("feedback-error");
        return;
    }

    if (selectedAnswer.value === "a") {
        collectionQuizFeedback.textContent = 'Correct! List indexes start at 0, so colours[0] is "purple".';
        collectionQuizFeedback.classList.add("feedback-success");
    } else {
        collectionQuizFeedback.textContent = "Not quite. Python starts list indexes at 0, which means index 0 is the first item.";
        collectionQuizFeedback.classList.add("feedback-error");
    }
});

function attachQuiz(button, answerName, feedback, correctAnswer, correctMessage, incorrectMessage) {
    button.addEventListener("click", function () {
        const selectedAnswer = document.querySelector(`input[name="${answerName}"]:checked`);

        feedback.classList.remove("feedback-success", "feedback-error");

        if (!selectedAnswer) {
            feedback.textContent = "Choose an answer first.";
            feedback.classList.add("feedback-error");
        } else if (selectedAnswer.value === correctAnswer) {
            feedback.textContent = correctMessage;
            feedback.classList.add("feedback-success");
        } else {
            feedback.textContent = incorrectMessage;
            feedback.classList.add("feedback-error");
        }
    });
}

function loadLessonExample(button, code, statusMessage) {
    button.addEventListener("click", function () {
        pythonCode.value = code;
        challengeMode = false;
        setChallengeFeedback("", "");
        playgroundStatus.textContent = statusMessage;
        pythonOutput.textContent = statusMessage;
        document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
        pythonCode.focus();
    });
}

attachQuiz(
    checkFunctionQuizButton,
    "functionQuizAnswer",
    functionQuizFeedback,
    "b",
    "Correct! return sends a result back to the code that called the function.",
    "Not quite. return sends a result back to the code that called the function."
);
attachQuiz(
    checkStringQuizButton,
    "stringQuizAnswer",
    stringQuizFeedback,
    "b",
    "Correct! The f-string inserts the value of name into the message.",
    "Not quite. An f-string replaces {name} with the value stored in the name variable."
);
attachQuiz(
    checkErrorQuizButton,
    "errorQuizAnswer",
    errorQuizFeedback,
    "a",
    "Correct! int() raises ValueError when text is not a valid whole number.",
    "Not quite. int() raises ValueError when it cannot convert the text to a whole number."
);
attachQuiz(
    checkFileQuizButton,
    "fileQuizAnswer",
    fileQuizFeedback,
    "c",
    'Correct! The "a" mode appends text to the end of a file.',
    'Not quite. The "a" mode appends text without replacing the old contents.'
);
attachQuiz(
    checkObjectQuizButton,
    "objectQuizAnswer",
    objectQuizFeedback,
    "a",
    "Correct! A class describes the data and behaviour that its objects can have.",
    "Not quite. A class is a blueprint used to create objects."
);

loadLessonExample(loadFunctionExampleButton, functionExampleCode, "Function example loaded. Select Run Python to see the returned result.");
loadLessonExample(loadStringExampleButton, stringExampleCode, "String example loaded. Select Run Python to see the formatted text.");
loadLessonExample(loadErrorExampleButton, errorExampleCode, "Error-handling example loaded. Select Run Python to see how ValueError is handled.");
loadLessonExample(loadFileExampleButton, fileExampleCode, "File example loaded. Select Run Python to write and read a temporary file in the browser.");
loadLessonExample(loadObjectExampleButton, objectExampleCode, "Object example loaded. Select Run Python to create a learner and call its method.");

async function initializePython() {
    try {
        pyodide = await loadPyodide();
        runCodeButton.disabled = false;
        checkChallengeButton.disabled = false;
        runDebugButton.disabled = false;
        checkDebugButton.disabled = false;
        debugCode.disabled = false;
        runCodeButton.textContent = "Run Python";
        playgroundStatus.textContent = "Python is ready. Your code runs in this browser.";
        pythonOutput.textContent = "Ready when you are. Run the example or write your own code.";
        loadDebugExercise();
    } catch (error) {
        runCodeButton.disabled = true;
        runCodeButton.textContent = "Python unavailable";
        playgroundStatus.textContent = "Python could not be loaded. Check your internet connection and refresh the page.";
        pythonOutput.textContent = `Loading error: ${error.message}`;
        debugStatus.textContent = "Python could not be loaded. Check your internet connection and refresh the page.";
        debugOutput.textContent = `Loading error: ${error.message}`;
    }
}

runCodeButton.addEventListener("click", function () {
    runPythonCode();
});

loadChallengeButton.addEventListener("click", function () {
    pythonCode.value = challengeCode;
    challengeMode = true;
    setChallengeFeedback("Complete the code, then select Check challenge.", "");
    pythonCode.focus();
});

loadOperatorExampleButton.addEventListener("click", function () {
    pythonCode.value = operatorExampleCode;
    challengeMode = false;
    setChallengeFeedback("", "");
    playgroundStatus.textContent = "Example loaded. Select Run Python to see the total.";
    pythonOutput.textContent = "Example loaded. Select Run Python to see the total.";
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
    pythonCode.focus();
});

loadConditionExampleButton.addEventListener("click", function () {
    pythonCode.value = conditionExampleCode;
    challengeMode = false;
    setChallengeFeedback("", "");
    playgroundStatus.textContent = "Starter example loaded. Select Run Python to see the decision.";
    pythonOutput.textContent = "Starter example loaded. Select Run Python to see the decision.";
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
    pythonCode.focus();
});

loadLoopExampleButton.addEventListener("click", function () {
    pythonCode.value = loopExampleCode;
    challengeMode = false;
    setChallengeFeedback("", "");
    playgroundStatus.textContent = "Starter example loaded. Select Run Python to see the loop.";
    pythonOutput.textContent = "Starter example loaded. Select Run Python to see the loop.";
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
    pythonCode.focus();
});

loadCollectionExampleButton.addEventListener("click", function () {
    pythonCode.value = collectionExampleCode;
    challengeMode = false;
    setChallengeFeedback("", "");
    playgroundStatus.textContent = "Starter example loaded. Select Run Python to see the fruits.";
    pythonOutput.textContent = "Starter example loaded. Select Run Python to see the fruits.";
    document.getElementById("playground").scrollIntoView({ behavior: "smooth" });
    pythonCode.focus();
});

checkChallengeButton.addEventListener("click", function () {
    challengeMode = true;
    runPythonCode(true);
});

pythonCode.addEventListener("input", function () {
    if (challengeMode) {
        setChallengeFeedback("", "");
    }
});

function setChallengeFeedback(message, result) {
    challengeFeedback.textContent = message;
    challengeFeedback.classList.remove("feedback-success", "feedback-error");

    if (result === "success") {
        challengeFeedback.classList.add("feedback-success");
    } else if (result === "error") {
        challengeFeedback.classList.add("feedback-error");
    }
}

function executePythonProgram(source, outputElement) {
    const outputLines = [];
    pyodide.setStdout({ batched: (line) => outputLines.push(line) });
    pyodide.setStderr({ batched: (line) => outputLines.push(line) });

    try {
        const result = pyodide.runPython(source);
        if (result !== undefined && result !== null) {
            outputLines.push(String(result));
        }

        outputElement.textContent = outputLines.length > 0
            ? outputLines.join("\n")
            : "Program finished with no output. Add a print() statement to display something.";
        return { succeeded: true, outputLines };
    } catch (error) {
        outputLines.push(error.message);
        outputElement.textContent = outputLines.join("\n");
        return { succeeded: false, outputLines };
    }
}

function runDebugExercise(checkFix) {
    const exercise = debugExercises[debugExerciseSelect.value];
    debugStatus.classList.remove("feedback-success", "feedback-error");
    runDebugButton.disabled = true;
    checkDebugButton.disabled = true;
    debugStatus.textContent = checkFix ? "Checking your repair..." : "Running the exercise...";

    const result = executePythonProgram(debugCode.value, debugOutput);
    if (!result.succeeded) {
        debugStatus.textContent = "Python reported an error. Read it, repair the code, and try again.";
        if (checkFix) {
            debugStatus.textContent += " Your fix is not complete yet.";
        }
    } else if (checkFix && result.outputLines.join("\n").trim() === exercise.expected) {
        debugStatus.textContent = "Correct! You fixed the bug.";
        debugStatus.classList.add("feedback-success");
        window.setTimeout(() => debugStatus.classList.remove("feedback-success"), 1600);
    } else if (checkFix) {
        debugStatus.textContent = "The code runs, but the result is not quite right yet. Compare it with the task and try again.";
    } else {
        debugStatus.textContent = "Program finished. Check the output, then edit the code.";
    }

    runDebugButton.disabled = false;
    checkDebugButton.disabled = false;
}

async function runPythonCode(checkChallenge = false) {
    runCodeButton.disabled = true;
    checkChallengeButton.disabled = true;
    runCodeButton.textContent = "Running...";
    playgroundStatus.textContent = "Running your Python program...";
    pythonOutput.textContent = "";

    try {
        if (checkChallenge) {
            pyodide.globals.set("first_number", null);
            pyodide.globals.set("second_number", null);
            pyodide.globals.set("total", null);
        }

        const result = executePythonProgram(pythonCode.value, pythonOutput);
        const outputLines = result.outputLines;
        if (!result.succeeded) {
            playgroundStatus.textContent = "Your program has an error. Read the message above, make a change, and try again.";
            if (checkChallenge) {
                setChallengeFeedback("Python found an error. Read the output, fix the code, and check again.", "error");
            }
            return;
        }

        playgroundStatus.textContent = "Program finished.";

        if (checkChallenge) {
            const variablesAreCorrect = pyodide.runPython(
                "isinstance(first_number, int) and not isinstance(first_number, bool) and first_number == 8 " +
                "and isinstance(second_number, int) and not isinstance(second_number, bool) and second_number == 5 " +
                "and isinstance(total, int) and not isinstance(total, bool) and total == first_number + second_number"
            );
            const printedAnswer = outputLines.some((line) => line.trim() === "13");

            if (variablesAreCorrect && printedAnswer) {
                setChallengeFeedback("Challenge complete! Your variables, calculation, and output are correct.", "success");
            } else if (!variablesAreCorrect) {
                setChallengeFeedback("Not quite. Check the variable names and values, then set total to their sum.", "error");
            } else {
                setChallengeFeedback("Your calculation is correct. Add print(total) so the answer appears in the output.", "error");
            }
        }
    } catch (error) {
        pythonOutput.textContent = error.message;
        playgroundStatus.textContent = "Your program has an error. Read the message above, make a change, and try again.";

        if (checkChallenge) {
            setChallengeFeedback("Python found an error. Read the output, fix the code, and check again.", "error");
        }
    } finally {
        runCodeButton.disabled = false;
        checkChallengeButton.disabled = false;
        runCodeButton.textContent = "Run Python";
    }
}

resetCodeButton.addEventListener("click", function () {
    pythonCode.value = starterCode;
    challengeMode = false;
    setChallengeFeedback("", "");
    pythonOutput.textContent = "Example restored. Select Run Python to see its output.";
    playgroundStatus.textContent = pyodide
        ? "Python is ready. Your code runs in this browser."
        : "Loading the Python runtime. This can take a little while the first time.";
});

initializePython();
loadPublishedLessons();
renderGlossary(glossaryTerms);
renderProjects();
loadDebugExercise();
checkAssistantStatus();
