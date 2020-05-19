import store from "../store.js";
import Question from "../Models/QuestionModel.js";

const _api = axios.create({
  baseURL: "https://jservice.io/api/random?count=100",
});

function _getQuestions(data) {
  let sortedQuestions = _sortQuestionsByCategory(data);
  let categoriesWithFiveQuestions = _categoriesWithFiveQuestions(
    sortedQuestions
  );
  let categoryChoiceObject = _randomCategoryChoice(categoriesWithFiveQuestions);
  let categoryChoices = Object.keys(categoryChoiceObject);
  let allQuestionsArray = _breakDownCategoryObject(categoryChoiceObject);

  return [categoryChoices, allQuestionsArray];
}

function _sortQuestionsByCategory(data) {
  let categories = {};
  let keys = [];
  for (let i = 0; i < data.length; i++) {
    keys = Object.keys(categories);
    if (keys.indexOf(data[i].category.title) < 0) {
      categories[data[i].category.title] = [data[i]];
    } else {
      categories[data[i].category.title].push(data[i]);
    }
  }
  return categories;
}

function _categoriesWithFiveQuestions(sortedQuestions) {
  let categoriesWithFiveQuestions = sortedQuestions;
  for (const key in categoriesWithFiveQuestions) {
    if (categoriesWithFiveQuestions[key].length < 5) {
      delete categoriesWithFiveQuestions[key];
    }
  }
  return categoriesWithFiveQuestions;
}

function _randomCategoryChoice(categories) {
  let randomChoices = [];
  let categoryChoices = {};
  let keys = Object.keys(categories);
  for (let i = 0; i < 6; i++) {
    let rc = Math.floor(Math.random() * keys.length);
    if (keys[rc] in categoryChoices) {
      i--;
    } else {
      categoryChoices[keys[rc]] = categories[keys[rc]];
    }
  }
  return categoryChoices;
}

function _breakDownCategoryObject(categories) {
  let questionArray = [];
  for (const key in categories) {
    for (let i = 0; i < categories[key].length; i++) {
      questionArray.push(new Question(categories[key][i]));
    }
  }
  return questionArray;
}

class QuestionService {
  checkAnswer(id, playerInput) {
    let activeQuestion = store.State.activeQuestion;
    let answer = activeQuestion.answer;
    const expression = "/*" + playerInput + "*";
    const regex = RegExp(expression);
    let result = regex.test(answer);
    console.log("result", result);
    if (result) {
      activeQuestion.correct = "correct";
      store.commit("activeQuestion", activeQuestion);
      console.log("in if");
    }
  }
  makeActive(id) {
    let question = store.State.questions.find((q) => q.id == id);
    store.commit("activeQuestion", question);
  }
  getAPIQuestions() {
    _api
      .get()
      .then((response) => {
        let questionArray = _getQuestions(response.data);
        let categories = questionArray[0];
        let questions = questionArray[1];
        store.State.categories = categories;
        store.commit("questions", questions);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const service = new QuestionService();
export default service;
