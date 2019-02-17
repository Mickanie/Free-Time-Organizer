const moviesTable = document.querySelector('.table-movies');
const seriesTable = document.querySelector('.table-series');
const booksTable = document.querySelector('.table-books');
const gamesTable = document.querySelector('.table-games');

const moviesButton = document.querySelector('#moviesButton');
const seriesButton = document.querySelector('#seriesButton');
const booksButton = document.querySelector('#booksButton');
const gamesButton = document.querySelector('#gamesButton');

const buttons = [moviesButton, seriesButton, booksButton, gamesButton];


const movies = JSON.parse(localStorage.getItem('movies')) || [];
const series = JSON.parse(localStorage.getItem('series')) || [];
const books = JSON.parse(localStorage.getItem('books')) || [];
const games = JSON.parse(localStorage.getItem('games')) || [];

const items = [movies, series, books, games];

const addItem = (event) => {
	
	event.preventDefault()// stops from reloading

	let table;
	let index;
		switch(event.target.id) {
		case 'moviesButton':
			table = moviesTable;
			index = 0;
			break;
		case 'seriesButton':
			table = seriesTable;
			index = 1;
			break;
		case 'booksButton':
			table = booksTable;
			index = 2;
			break;
		case 'gamesButton':
			table = gamesTable;
			index = 3;
			break;
	}

	console.log(table);
	
	const input = table.querySelector('input[type="text"]');
	items[index].push({ name: input.value, done: 0});

		const ul = table.querySelector('ul');


	input.value = '';

	   ul.innerHTML = items[index].map((item, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}/>
        <label for="item${i}">${item.name}</label>
      </li>

      `
    }).join(''); 

}


buttons.forEach(button => button.addEventListener('click', addItem));


