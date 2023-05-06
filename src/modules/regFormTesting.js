// обработка формы регистрации тестируемого для прохождения теста
import { openModal, closeModal } from "./modals";
import { questionsFunc } from "./questions";
import { postData } from "./api";

export const regFormTesting = () => {
	const regForm = document.querySelector('.registration__form')
	const openRegTest = document.getElementById('open-reg-test');
	const surname = document.getElementById('surname') //Фамилия
	const name = document.getElementById('name') // Имя
	const patronymic = document.getElementById('patronymic') //Отчество
	const department = document.getElementById('department') //Селект выбора подразделения
	const btnStartTesting = document.getElementById('start-testing') //кнопка начало тестирования


	openRegTest.addEventListener('click', () => {
		openModal(regForm)
	})

	// отключение кнопки пока не будут заполнены все инпуты
	const checkValues = () => {
		if (surname.value === '' || name.value === '' || patronymic.value === '' || department.value === '') {
			btnStartTesting.disabled = true
		} else {
			btnStartTesting.disabled = false
		}
	}

	//сохранение данных из регформы и других данных
	let personData = {
		id: '',//0,
		surname: '',//"Шелковой",
		name: '',//"Сергей",
		patronymic: '',//"Михайлович",
		department: '',//"АХЧ",
		date: '',//"12.03.2023",
		examinationPaper: '', //"Сюда отправляется текст страницы с вариантами ответов экзаменуемого",
		result: '' //true
	}

	//Заполнение анкетных данных тестируемого
	surname.addEventListener('input', () => {
		personData.surname = surname.value
		checkValues()
	})
	name.addEventListener('input', () => {
		personData.name = name.value
		checkValues()
	})
	patronymic.addEventListener('input', () => {
		personData.patronymic = patronymic.value
		checkValues()
	})
	department.addEventListener('input', () => {
		personData.department = department.value
		checkValues()
	})
	checkValues()

	// дата теста
	let testDate = (new Date).toLocaleString()
	personData.date = testDate

	//текст билета
	// Получение номеров билетов 
	function numberQuestionArray() {
		const questionBlock = document.querySelectorAll('.question__block')//блок вопроса и вариантов ответов
		let arrQuest = [];
		questionBlock.forEach(function (item) {
			arrQuest.push(item.dataset.number);			
		})		
		personData.examinationPaper = arrQuest.join([', '])
	}



	//результат
	//personData.result = 



	btnStartTesting.addEventListener('click', (e) => {
		e.preventDefault()
		questionsFunc()
		setTimeout(() => {
			numberQuestionArray()
			postData('/person_ot', personData)
			console.log(personData);
		}, 1000);
		closeModal(regForm)
	})


}
