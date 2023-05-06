import { getData } from "./api";

//random
export const randomQuestion = () => {
	let arrayRandom = [];
	function random(data) {
		let arrayQuestions = [];
		data.forEach(item => {
			arrayQuestions.push(item)
		});

		let rand;
		for (let i = 0; i < 10; i++) {
			rand = Math.floor(Math.random() * (arrayQuestions.length - 0) + 0)//Максимум не включается, минимум включается			 
			if (!arrayRandom.includes(rand)) {
				arrayRandom.push(rand)
			} else {
				i--
			}
		}
	}

	getData('/questions_ot').then((data) => {
		random(data);
	})
		.catch((error) => {
			console.error('Ошибка, кажется путь указан неверно');
		})

	return arrayRandom;
}