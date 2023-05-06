import { getData } from "./api";
import { answerCheck } from "./answerCheck"
import { randomQuestion } from "./random"

//табы на  4ч 38мин  5-10

export const questionsFunc = () => {
	
	// const testBigContainer = document.querySelector('main')
	// const testContent = document.querySelector('.test__content')
	const questionWrapper = document.querySelector('.question__wrapper')//блок обертка вопросов и вариантов ответов
	const sectionInfo = document.querySelector('.info') //это секшен с главной страницы нужно удалить при начале теста
	
	const questionItem = document.querySelectorAll('.question__item') //табы от 1 до 10 кнопочки вверху
	const testSection = document.querySelector('.test') //это секшен с главной страницей теста 

	//Освобождаем место для тестирования, убираем лишние блоки
	const headerNav = document.querySelector('.header__nav')
	const headerTitle = document.querySelector('.header__title')
	//Переменные функции OPEN
	const confirmAnswerBtn = document.getElementById('confirm-answer') //кнопкa - подтвердить ответ	
	const arrayRandom = randomQuestion()
	const testCompleteBtn = document.getElementById('test-complete') //кнопкa - Завершить тест
//console.log("Рандомная выборка:");
//console.log(arrayRandom);

	const cleanWindow = () => {		
		sectionInfo && sectionInfo.classList.add('visually-hidden')
		headerNav && headerNav.classList.add('visually-hidden')		
	}	
	// const returnWindowR = () => {
	// 	testSection.classList.add('visually-hidden')
	// 	headerTitle.classList.add('visually-hidden')
	// 	sectionInfo && sectionInfo.classList.remove('visually-hidden')
	// 	headerNav && headerNav.classList.remove('visually-hidden')
	// }

	//Добавляем вопросы на страницу
	const render = (data) => {		
		cleanWindow()
		
		testSection.classList.remove('visually-hidden')
		headerTitle.classList.remove('visually-hidden')

		for (let i = 0; i < arrayRandom.length; i++) {
			for (let j = 0; j < data.length; j++) {
				if (arrayRandom[i] === data[j].number) {
					let item = data[j];					
					
					//добавляем в questionBlock атрибут id=content + i
					
					questionWrapper.insertAdjacentHTML('beforeend',
						`
							<div class="question__block " id=content${i} data-number="${item.number}">
								<h2 id="question">${item.content}</h2>
								<form action="" method="" class="test__form">
									<p><input type="radio" name="ansver" id="answer1${i}"><label for="answer1${i}">${item.one.text}</label></p>
									<p><input type="radio" name="ansver" id="answer2${i}"><label for="answer2${i}">${item.two.text}</label></p>
									<p><input type="radio" name="ansver" id="answer3${i}"><label for="answer3${i}">${item.three.text}</label></p>
									<p><input type="radio" name="ansver" id="answer4${i}"><label for="answer4${i}">${item.four.text}</label></p>									
								</form>	
							</div>		
						`)
				}
			}
		}
		document.getElementById('content0').classList.add('block__active') //Чтобы первый вопрос сразу отображался		 
		
		//-----реализация работы табов с вопросами билета------------

		questionItem.forEach(function (element) {
			element.addEventListener('click', open)			
		})

		function open(event) {
			const tabTarget = event.currentTarget; //вопрос который нажат
			const questionItemData = tabTarget.dataset.question;
			const questionBlock = document.querySelectorAll('.question__block')//блок вопроса и вариантов ответов
			
			questionItem.forEach(function (item) {
				item.classList.remove('question__active');	// удалили актив у всех кнопок 		
			})
			tabTarget.classList.add('question__active'); //добавили актив тому на кого нажали

			questionBlock.forEach(function (item) {
				item.classList.remove('block__active');
			})			
			document.querySelector(`#${questionItemData}`).classList.add('block__active')//Добавляем класс актив вопросу соответсвующему нажатому табу
		}		//конец функции open
		
	} //конец функции render

	//Реализация перехода к следующему вопросу по нажатию кнопки подтвердить ответ
		

		// Порядок перемещения между вопросами, проверка на сделан ли выбор ответа, когда длош до конца не осталось ли пропущенных и переход к пропущенному вопроса
		
		function completeQuestion () {
			//забираем из id последний знак преобразуем в число  формируем новый id +1 и добавляем блоку с таким айди и блоку с таким data-question класс актив. и удаляем у предыдущего
			const questionBlock = document.querySelectorAll('.question__block')//блок вопроса и вариантов ответов
			const marker = document.querySelector('.question__block.block__active').id.split("")[7];	// получаем последний знак id блока вопросов - номер билета			

			//здесь получаем значение id текущего (активного) вопроса 
			function next (){
				let nextQuestionId;
				if(0 <= marker && marker < 9){
					nextQuestionId = "content" + (+marker + 1);
				} else if (marker == 9) {
					// здесь реализовать переход к вопросу где не выбран ответ
					questionWrapper.insertAdjacentHTML('beforeend',
					`
						<div class="question__block block__active">
							<h2 >Тест пройден. Нажмите кнопку - "Завершить тест" для получения результата</h2>
						</div>						
					`)					
					//searchUnAnswerQuestion()			
				}
			return nextQuestionId;
			}		
							
			const addActiv = () => {
				//далее функционал отображения вопроса соответствующего нажатому табу
				questionItem.forEach(function (item) {
					item.classList.remove('question__active');	// удалили актив у всех кнопок/табов 		
				})
				questionBlock.forEach(function (item) {
					item.classList.remove('block__active'); //удалили актив у всех блоков вопросов				
				})
				document.querySelector(`#${next()}`).classList.add('block__active')//Добавляем класс актив вопросу соответсвующему нажатому табу

				//реализация перехода к следующему вопросу по нажатию кнопки "Подтвердить ответ"
				//Ищем таб с datasetom значение которого равно следующему табу и этому табу добавляем класс актив  
				questionItem.forEach(function (item) {
					if (item.dataset.question == `${next()}`){
						item.classList.add('question__active')						
					}
				})	
			}
			addActiv()
		} //конец функции completeQuestion	
		
		// нажатие на кнопку ПОДТВЕРДИТЬ ОТВЕТ					
		confirmAnswerBtn.addEventListener('click', completeQuestion)
		//нажатие кнопки ЗАВЕРШИТЬ ТЕСТ
		
		testCompleteBtn.addEventListener('click', () => {
			answerCheck();			
		})
		
	getData('/questions_ot')
		.then((data) => {
			render(data);
		})
		.catch((error) => {
			console.error('Ошибка, кажется путь указан неверно');
	})	
} //конец questionsFunc



/*
	делаем запрос на сервер к файлу db.json к его свойству questions, и в ответ через then((response) => {}) получаем вce это свойство (response - ответ)
	*/
	//fetch('http://localhost:3001/questions').then((response) => {
	/*чтобы полученный ответ превратить в удобочитаемый необходимо использовать метод json()*/
	// 	return response.json()		
	// })
	/*методы fetch и json отработываю какой-то промежуток времени, поэтому чтобы все было представлено в нужном виде нужно добавить еще один then() который будет дожидаться обработки данных и сработает когда все будет готово. */
	// .then((data) => {
	// 	console.log(data);
	// })