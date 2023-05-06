const apiPath = 'http://localhost:3001' //адрес сервера


export const getData = (path) => {
	return fetch(apiPath + path).then(response => {    //path - это путь по которому fetch сделает запрос, а then(response) получит какие либо данные и раскроет их в нужный нам формат - json
		if (!response.ok) {
			throw new Error
		};
		return response.json()
	})               
}

export const postData = (path, data) => {
	return fetch(apiPath + path, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		if (!response.ok) {
			throw new Error
		}
		return response.json()
	})
}