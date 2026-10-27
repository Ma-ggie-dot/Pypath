
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
const pythonCode = document.getElementById("pythonCode");
const runCodeButton = document.getElementById("runCodeButton");
const resetCodeButton = document.getElementById("resetCodeButton");
const loadChallengeButton = document.getElementById("loadChallengeButton");
const checkChallengeButton = document.getElementById("checkChallengeButton");
const challengeFeedback = document.getElementById("challengeFeedback");
const playgroundStatus = document.getElementById("playgroundStatus");
const pythonOutput = document.getElementById("pythonOutput");

const starterCode = pythonCode.value;
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
const challengeCode = `# Set the two numbers
first_number = 8
second_number = 5

# Add the numbers and display the answer
`;
let pyodide;
let challengeMode = false;

startButton.addEventListener("click", function () {
    document.getElementById("learn").scrollIntoView({ behavior: "smooth" });
});

learnButton.addEventListener("click", function () {
    document.getElementById("learn").scrollIntoView({ behavior: "smooth" });
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

async function initializePython() {
    try {
        pyodide = await loadPyodide();
        runCodeButton.disabled = false;
        checkChallengeButton.disabled = false;
        runCodeButton.textContent = "Run Python";
        playgroundStatus.textContent = "Python is ready. Your code runs in this browser.";
        pythonOutput.textContent = "Ready when you are. Run the example or write your own code.";
    } catch (error) {
        runCodeButton.disabled = true;
        runCodeButton.textContent = "Python unavailable";
        playgroundStatus.textContent = "Python could not be loaded. Check your internet connection and refresh the page.";
        pythonOutput.textContent = `Loading error: ${error.message}`;
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

async function runPythonCode(checkChallenge = false) {
    runCodeButton.disabled = true;
    checkChallengeButton.disabled = true;
    runCodeButton.textContent = "Running...";
    playgroundStatus.textContent = "Running your Python program...";
    pythonOutput.textContent = "";

    const outputLines = [];
    pyodide.setStdout({ batched: (line) => outputLines.push(line) });
    pyodide.setStderr({ batched: (line) => outputLines.push(line) });

    try {
        if (checkChallenge) {
            pyodide.globals.set("first_number", null);
            pyodide.globals.set("second_number", null);
            pyodide.globals.set("total", null);
        }

        const result = pyodide.runPython(pythonCode.value);

        if (result !== undefined && result !== null) {
            outputLines.push(String(result));
        }

        pythonOutput.textContent = outputLines.length > 0
            ? outputLines.join("\n")
            : "Program finished with no output. Add a print() statement to display something.";
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
        outputLines.push(error.message);
        pythonOutput.textContent = outputLines.join("\n");
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
