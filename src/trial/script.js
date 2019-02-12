const moviesInput = document.querySelector('#moviesInput');
const seriesInput = document.querySelector('#seriesInput');
const booksInput = document.querySelector('#booksInput');
const gamesInput = document.querySelector('#gamesInput');

const moviesButton = document.querySelector('#moviesButton');
const seriesButton = document.querySelector('#seriesButton');
const booksButton = document.querySelector('#booksButton');
const gamesIButton = document.querySelector('#gamesButton');

const buttons = [moviesButton, seriesButton, booksButton, gamesButton]

// const movies = JSON.parse(localStorage.getItem('items')) || [];
// const series = JSON.parse(localStorage.getItem('items')) || [];
// const books = JSON.parse(localStorage.getItem('items')) || [];
// const games = JSON.parse(localStorage.getItem('items')) || [];

const addItem = (event) => {
	event.preventDefault()// stops from reloading
	const input = event.target.previousElementSibling;
	const table = input.parentElement.parentElement.parentElement.parentElement;
	const newItem = document.createElement('li');
	newItem.appendChild(document.createTextNode(input.value));
	const ul = table.querySelector('ul');
	ul.appendChild(newItem);
	input.value = '';

}

const updateTables = () => {

}

buttons.forEach(button => button.addEventListener('click', addItem));


