document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What percentage of the human body is made of water?",
            options: ["About 30%", "Over 60%", "Exactly 50%", "Less than 20%"],
            correct: 1
        },
        {
            question: "Which of these is NOT a benefit of water conservation?",
            options: ["Lower utility bills", "Increased energy consumption", "Protected ecosystems", "Improved social well-being"],
            correct: 1
        },
        {
            question: "What's the best time to water plants for conservation?",
            options: ["Midday", "Early morning", "Late afternoon", "Both B and C"],
            correct: 3
        },
        {
            question: "How much water can fixing leaks potentially save annually?",
            options: ["10-50 gallons", "100-200 gallons", "Hundreds of gallons", "No significant savings"],
            correct: 2
        },
        {
            question: "Which appliance helps conserve water?",
            options: ["High-pressure shower", "Low-flow showerhead", "Traditional toilet", "Older washing machine"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = []; // Track user's answers for each question

    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionNumber = document.getElementById('question-number');

    function showQuestion() {
        const question = questions[currentQuestion];
        questionContainer.innerHTML = `<p>${question.question}</p>`;
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button class="option" onclick="selectAnswer(${index})">${option}</button>
        `).join('');
        questionNumber.textContent = `${currentQuestion + 1}/${questions.length}`;
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = true; // Disable "Next" until an option is selected

        // Highlight the user's selected answer if they've already answered this question
        if (userAnswers[currentQuestion] !== undefined) {
            const options = document.querySelectorAll('.option');
            options[userAnswers[currentQuestion]].classList.add('selected');
            if (userAnswers[currentQuestion] === question.correct) {
                options[userAnswers[currentQuestion]].classList.add('correct');
            } else {
                options[userAnswers[currentQuestion]].classList.add('incorrect');
            }
            nextBtn.disabled = false; // Enable "Next" if the question is already answered
        }
    }

    window.selectAnswer = function(selectedIndex) {
        const options = document.querySelectorAll('.option');
        
        // Disable all options after one is selected
        options.forEach(option => {
            option.disabled = true;
            option.classList.remove('selected', 'correct', 'incorrect');
        });

        // Highlight the selected option
        options[selectedIndex].classList.add('selected');

        // Check if the answer is correct
        if (selectedIndex === questions[currentQuestion].correct) {
            options[selectedIndex].classList.add('correct');
            score++;
        } else {
            options[selectedIndex].classList.add('incorrect');
        }

        // Store the user's answer
        userAnswers[currentQuestion] = selectedIndex;

        // Enable the "Next" button
        nextBtn.disabled = false;
    }

    function showResult() {
        questionContainer.style.display = 'none';
        optionsContainer.style.display = 'none';
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';

        // Build the recap section
        let recapHTML = `<h4>Your Score: ${score}/${questions.length}</h4>`;
        recapHTML += `<p>${score === questions.length ? 'Excellent! You\'re a water conservation expert!' 
                       : score >= 3 ? 'Good job! Keep learning!' 
                       : 'Keep trying! Every drop counts!'}</p>`;
        recapHTML += `<h4>Quiz Recap:</h4>`;
        recapHTML += `<div class="recap-container">`;

        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            recapHTML += `
                <div class="recap-item ${isCorrect ? 'correct-recap' : 'incorrect-recap'}">
                    <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                    <p><strong>Your Answer:</strong> ${question.options[userAnswer]}</p>
                    <p><strong>Correct Answer:</strong> ${question.options[question.correct]}</p>
                </div>
            `;
        });

        recapHTML += `</div>`;
        resultContainer.innerHTML = recapHTML;
    }

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });

    showQuestion();
});