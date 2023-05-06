const authBtn = document.getElementById('open-auth-btn');
const modal = document.getElementById('auth-modal');
const closeBtns = document.querySelectorAll('.btn-close');
const loginBtn = document.querySelector('.login__btn');
const logoutBtn = document.getElementById('close-auth-btn');



const openModal = () => {
	setTimeout(() => {
		modal.classList.add('show')
	}, 100)
};

const closeModal = () => {
	modal.classList.remove('show')
	setTimeout(() => {
		modal.classList.remove('show')

	}, 300)
};

const login = () => {
	authBtn.classList.add('visually-hidden')
	logoutBtn.classList.remove('visually-hidden')
	
	//closeModal()
};

const logout = () => {
	authBtn.classList.remove('visually-hidden')
	logoutBtn.classList.add('visually-hidden')
	location.reload()
};

const checkAuth = () => {
	if (JSON.parse(localStorage.getItem('auth'))) {
		login()
	}
};

authBtn.addEventListener('click', openModal);

closeBtns.forEach((btn) => {
	btn.addEventListener('click', closeModal)
});

loginBtn.addEventListener('click', () => {
	const loginInput = modal.querySelector('#login-control')
	const passwordInput = modal.querySelector('#password-control')
	const admin = {
		login: "admin",
		password: "12345678"
	}

	if (loginInput.value == "" || passwordInput.value == "") {
		alert("Заполните необходимые поля");
		return;
	} else if (loginInput.value == admin.login || passwordInput.value == admin.password) {
		login()
		closeModal()
		localStorage.setItem('auth', JSON.stringify(admin))
	} else if (loginInput.value != admin.login || passwordInput.value != admin.password) {
		alert("Вы ввели неверный лоргин или пароль \nПовторите попытку");
		loginInput.value = ""
		passwordInput.value = ""
	}
});

logoutBtn.addEventListener('click', () => {
	localStorage.removeItem('auth')
	logout()
});

checkAuth();