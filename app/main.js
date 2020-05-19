// import ValuesController from "./Controllers/ValuesController.js";

import QuestionController from "./Controllers/QuestionController.js";

class App {
  // valuesController = new ValuesController();
  questionController = new QuestionController();
}

window["app"] = new App();
