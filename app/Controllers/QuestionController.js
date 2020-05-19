import store from "../store.js";
import service from "../Services/QuestionService.js";

//Private
function _initialDraw() {
  //   let categories = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"];
  //   let questions = store.State.questions;
  let categories = store.State.categories;
  let values = [200, 400, 600, 800, 1000];
  let gameboard = document.getElementById("gameboard");
  for (let i = 0; i < gameboard.children.length; i++) {
    let gameColumn = gameboard.children[i];
    for (let j = 0; j < gameColumn.children.length; j++) {
      let square = gameColumn.children[j];
      if (j == 0) {
        square.innerHTML = /*html*/ `<h6>${categories[i]}</h6>`;
      } else {
        square.innerHTML = /*html*/ `<h3>${values[j - 1]}</h3>`;
        square.id = categories[i] + "-" + values[j - 1].toString();
        square.setAttribute(
          "onclick",
          "app.questionController.makeActive('" + square.id + "')"
        );
      }
    }
  }

  gameboard.children[0].children[0].id = "randomthing";
}

function _drawDetails() {
  let activeQuestion = store.State.activeQuestion;
  document.getElementById("question-detail").innerHTML =
    activeQuestion.DetailTemplate;
  console.log("draw detail");
}

//Public
export default class QuestionController {
  constructor() {
    store.subscribe("questions", _initialDraw);
    store.subscribe("activeQuestion", _drawDetails);

    service.getAPIQuestions();
    // _initialDraw();
  }

  makeActive(id) {
    service.makeActive(id);
  }

  checkAnswer(event, id) {
    event.preventDefault();
    let playerInput = event.target.playerInput.value;
    service.checkAnswer(id, playerInput);
    // console.log("controller");
  }
}
