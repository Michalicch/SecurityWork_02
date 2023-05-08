import { openModal, closeModal } from "./modals";
import { getData } from "./api";
import { regForTesting } from "./regFormTesting"


// видео 2 - 58минута


export const authFunc = () => {
	const authBtn = document.getElementById('open-auth-btn');
	const modal = document.getElementById('auth-modal');
	const closeBtns = document.querySelectorAll('.btn-close');
	const loginBtn = document.querySelector('.login__btn');
	const logoutBtn = document.getElementById('close-auth-btn');

	const openRegTest = document.getElementById('open-reg-test');
	const regForm = document.querySelector('.registration__form')


	const login = () => {
		authBtn.classList.add('visually-hidden')
		logoutBtn.classList.remove('visually-hidden')
		closeModal(modal)
	};

	const logout = () => {
		localStorage.removeItem('auth')
		window.location.href = "./index.html"
		authBtn.classList.remove('visually-hidden')
		logoutBtn.classList.add('visually-hidden')
		//location.reload()
		

	};

	const checkAuth = () => {
		const admin = JSON.parse(localStorage.getItem('auth'))

		if (admin) {
			getData('/profile').then((data) => {
				if ((data.login && data.login === admin.login) &&
					(data.password && data.password === admin.password)) {
					// localStorage.setItem('auth', JSON.stringify(data))
					login()
					// closeModal()
					window.location.href = "./admin.html"
				}
			})
		}
	};

	authBtn.addEventListener('click', () => {
		openModal(modal)
	});

	closeBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			closeModal(modal)
			closeModal(regForm)
		})
	});

	loginBtn.addEventListener('click', () => {
		const loginInput = modal.querySelector('#login-control')
		const passwordInput = modal.querySelector('#password-control')
		const admin = {
			login: loginInput.value,
			password: passwordInput.value
		}
		getData('/profile').then((data) => {
			if (loginInput.value == "" || passwordInput.value == "") {
				alert("Заполните необходимые поля");
				return;
			} else if (data.login != admin.login || data.password != admin.password) {
				loginInput.value = ""
				passwordInput.value = ""
				alert("Вы ввели неверный логин или пароль \nПовторите попытку");
			} else if ((data.login && data.login === admin.login) &&
				(data.password && data.password === admin.password)) {
				localStorage.setItem("auth", JSON.stringify(data));
				login()
				// window.location.href = "./admin.html"
				// closeModal()

			}
		})
	});

	logoutBtn.addEventListener('click', () => {
		
		logout()

	});

	openRegTest.addEventListener('click', () => {
		openModal(regForm)		
	})

	


	// валидация формы перед тестированием

	





	checkAuth();
}