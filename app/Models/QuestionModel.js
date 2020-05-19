export default class Question {
  constructor(data) {
    this.id = data.category.title + "-" + data.value;
    this.question = data.question;
    this.answer = data.answer;
    this.value = data.value;
    this.category = data.category.title;
    this.correct = "unanswered";
  }

  get DetailTemplate() {
    return /*html*/ `
        <div class="jumbotron">
            <h5 class="display-6">
                ${this.question}
            </h5>
            <small>${this.answer}</small>
            <form class="form-inline" onsubmit="app.questionController.checkAnswer(event,'${
              this.id
            }')">
              <div class="form-group">
                <label for="playerInput">Your Answer</label>
                <input
                  type="text"
                  name="playerInput"
                  id=""
                  class="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <button type="submit" class="btn btn-primary">Check Answer</button>
                <small class="${
                  this.correct == "correct" ? "d-block" : "d-none"
                }">Correct</small>
              </div>
            </form>
          </div>
    `;
  }
}
