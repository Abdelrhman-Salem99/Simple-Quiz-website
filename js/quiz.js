export class Quiz {
    constructor(results, number) {

        this.results = results;
        this.number = number;
        this.questionText = $("#question");
        this.current = $("#current");
        this.totalAmount = $("#totalAmount");
        this.rowAnswer = $("#rowAnswer");
        this.nextBtn = $("#next");
        this.answerElements = document.getElementsByName("answer");
        this.correctAlert = $("#correct");
        this.inCorrectAlert = $("#inCorrect");
        this.alertChoose = $(".alert");
        this.score = $("#score");
        this.finalScore = 0;



        this.currentNumber = 1;
        this.showQuestionsCount = 0;

        this.showQuestion(results);

        this.nextBtn.click(() => {

            this.getAnswer();


        })

    }

    showQuestion() {

        let questions = this.results[this.showQuestionsCount].question;
        this.questionText.html(questions);
        this.numOfQuestions();
        this.getAnswers(this.results);




    }

    numOfQuestions() {
        this.current.html(this.currentNumber);
        this.totalAmount.html(this.results.length);

    }

    getAnswers() {

        let answers = [this.results[this.showQuestionsCount].correct_answer, ...this.results[this.showQuestionsCount].incorrect_answers];
        this.getAnswersRandom(answers)
    }

    getAnswersRandom(answers) {
        let answerRandom = [];
        for (let i = answers.length; i > 0; i--) {
            var num = Math.floor((Math.random() * answers.length));
            answerRandom.push(answers[num]);
            answers.splice(num, 1);
        }
        this.showAnswers(answerRandom);
    }


    showAnswers(answers) {
        let temp = '';
        for (let i = 0; i < answers.length; i++) {
            temp += `<div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answers[i]}">
              ${answers[i]}
            </label>
        </div>`;
        }
        this.rowAnswer.html(temp);
    }


    getAnswer() {

        let answerChoosed = [...this.answerElements].filter(element => element.checked);
        if (answerChoosed.length == 0) {
            this.alertChoose.fadeIn(100);
        }
        else {
            this.checkAnswer(answerChoosed[0].value);
            this.alertChoose.fadeOut(0);
        }


    }

    checkAnswer(answerChoosed) {

        if (answerChoosed == this.results[this.showQuestionsCount].correct_answer) {

            this.correctAlert.fadeIn(500, () => {
                this.finalScore++;

            });
        }
        else {
            this.inCorrectAlert.fadeIn(500, () => {
            });
        }
        if (this.currentNumber == this.results.length) {
            console.log(this.results.length);
            this.finish();
        }
        else {
            this.showQuestion();
        }
        this.correctAlert.fadeOut(500);
        this.inCorrectAlert.fadeOut(500);
        this.currentNumber++;
        this.showQuestionsCount++;


    }


    finish() {
        let counter = 0;
        $("#quiz").fadeOut(700, () => {
            $("#finish").fadeIn(700);
        });

        this.score.html(this.finalScore);

    }
}