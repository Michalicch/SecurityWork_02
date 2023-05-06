import { getData } from "./api";


// проверка выбора варианта ответа и отправки результата на сервер
export const answerCheck = () => {
	const questionWrapper = document.querySelector('.question__wrapper')//блок обертка вопросов и вариантов ответов
	const testForm = questionWrapper.querySelectorAll('.test__form')//все формы с вариантами ответов		
	const questionFinish = document.querySelector('.test__content') 	

	getData('/questions_ot')
		.then((data) => {
			jsonQuestion(data);
		})
		.catch((error) => {
			console.error('Ошибка, кажется путь указан неверно');
		})

	//Проверка правильности ответов и окрашивание табов	
	const jsonQuestion = (data) => {
		let numberQuestion;//номер билета текущей формы
		let formInput; //четыре инпута из формы
		let thisQuestion; //билет в jsonфайле в виде объекта
		let questionId; //id блока вопроса
		let qId; //Номер вопроса в котором не выбран ни один вариант ответа
		let answer; //Переменная (булеева) для проверки верный или неверный ответ
		let counter = 10; //Счетчик для проверки сдал не сдал
		let countBigs = 0; //Переменная для определения конгда тест не решали вообще
		let questionsAlert = ""; //Список номеров вопросов в которых не выбран ни один вариант ответа
		let result = ""; //Текст отображаемый по окончании теста

		data.forEach(function (elem) {
			let countBig;
			testForm.forEach(function (item) { //item - одна тестформа в масиве
				formInput = item.querySelectorAll('input[name="ansver"]')
				numberQuestion = item.parentNode.dataset.number;
				questionId = item.parentNode.id;
				qId = +questionId.split("")[7] + 1;
				let count = 0;
				countBig = 0;
				if (elem.number == numberQuestion) {
					thisQuestion = elem;//билет в jsonфайле в виде объекта соответствующий текущему на странице

					//Проверка на правильность ответа 
					formInput.forEach(function (element) {
						if (element.checked) {
							switch (+element.id.split("")[6]) {
								case 1: answer = thisQuestion.one.right;
									break;
								case 2: answer = thisQuestion.two.right;
									break;
								case 3: answer = thisQuestion.three.right;
									break;
								case 4: answer = thisQuestion.four.right;
									break;
							}
							if (answer) {
								document.querySelector(`.question__item[data-question=${questionId}]`).classList.add('right')
							} else if (!answer) {
								counter--;
								document.querySelector(`.question__item[data-question=${questionId}]`).classList.add('wrong')
							}
							formInput.forEach(function(e){
								e.setAttribute('disabled', 'disabled')
							})
						} else if (!element.checked) {
							count++;
							if (count == 4) {
								countBig = count;
								questionsAlert = questionsAlert + `  ${qId}`;
							}
							countBigs = countBigs + countBig;
						}
					})
				} else {
					return
				}
			})
		})

		//Проверка на отвечаемость на вопросы
		if (countBigs == 40) {
			alert("Вы не ответили ни на один вопрос!!!");
			location.reload();
		} else if (countBigs >= 4 && countBigs < 40) {
			alert(`Вы не ответили на следующие вопросы: ${questionsAlert}`);
			return;
		}

		//Проверка и отоброжение результата теста
		document.getElementById('confirm-answer').classList.add('visually-hidden')
		document.querySelector('.question__wrapper').classList.add('visually-hidden')

		if (counter < 8) {
			result = "Сожалеем, но Вам нужно подучиться - Вы не прошли тест!"
		} else {
			result = "Поздравляем, Вы успешно прошли тест!!!"
		}	

		questionFinish.insertAdjacentHTML('beforeend',
			`
				<div class="question__finish">
					<h2 >${result}</h2>								
				</div>		
			`)
		setTimeout(()=>{
			location.reload();
		}, 5000)
	}
	jsonQuestion();	

} //конец функции answerCheck