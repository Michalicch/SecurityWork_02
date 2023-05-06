export const openModal = (modal) => {
	setTimeout(() => {
		modal.classList.add('show')
	}, 100)
};

export const closeModal = (modal) => {
	setTimeout(() => {
		modal && modal.classList.remove('show') // modal &&  - означает если modal есть, то удаляем класс show 
	}, 300)
};

// export 
