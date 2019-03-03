const moviesTable = document.querySelector('.table-movies');
const seriesTable = document.querySelector('.table-series');
const booksTable = document.querySelector('.table-books');
const gamesTable = document.querySelector('.table-games');

const moviesButton = document.querySelector('#moviesButton');
const seriesButton = document.querySelector('#seriesButton');
const booksButton = document.querySelector('#booksButton');
const gamesButton = document.querySelector('#gamesButton');

const buttons = [moviesButton, seriesButton, booksButton, gamesButton];
const forms = document.querySelectorAll('form');
			const ul = document.querySelectorAll('ul');

const movies = [];
const series = [];
const books = [];
const games= [];

items = JSON.parse(localStorage.getItem('items')) || [movies, series, books, games];



console.log(items);


 const toggleDone = (e) => {

    /*if (!e.target.matches('input')) return; //skip this unless its an input*/
    const el = e.target.previousElementSibling;
    const index = el.dataset.index;
    const id = el.dataset.id;
  
    items[index][id].done = !items[index][id].done;
    localStorage.setItem('items', JSON.stringify(items));
    updateTables();


  }

const updateTables = () => {


			for (let n=0; n<4; n++) {
				ul[n].innerHTML = items[n].map((item, i) => {
					 return `
	      <li>
	        <input type="checkbox" data-index=${n} data-id="${i}" ${item.done ? 'checked' : ''}/>
	        <label for="item${i}">${item.name}</label><button><img src="./img/delete.png" class="delete-img"></button>
	      </li>

	      `
	    }).join(''); 

			}
			let deleteButtons = document.querySelectorAll('.delete-img');
			deleteButtons.forEach(button => button.addEventListener('click', deleteItem));
		  document.querySelectorAll('label').forEach(li=>li.addEventListener('click', toggleDone));

}


const addItem = (event) => {
	
	event.preventDefault()// stops from reloading

	let table;
	let index;

		switch(event.target.children[1].id) {
		case 'moviesButton':
			table = moviesTable;
			index = 0;
			break;
		case 'seriesButton':
			table = seriesTable;
			index=1;
			break;
		case 'booksButton':
			table = booksTable;
			index=2;
			break;
		case 'gamesButton':
			table = gamesTable;
			index=3;
			break;
	}

	console.log(table);
	
	const input = table.querySelector('input[type="text"]');
	items[index].push({ name: input.value, done: false});
	
	localStorage.setItem('items', JSON.stringify(items));



	input.value = '';
	updateTables();



}


const deleteItem = (event) => {
	console.log(event.target.parentNode.parentNode)
	const li = event.target.parentNode.parentNode;
	//text content of li:
	const info = li.children[1].textContent; //remove whitespaces
	const index = li.children[0].dataset.index; //indicates which table is it in

	li.remove();
	items[index] = items[index].filter(item=> item.name !== info);
	localStorage.setItem('items', JSON.stringify(items));
	updateTables();


}

updateTables();




  document.querySelectorAll('label').forEach(li=>li.addEventListener('click', toggleDone));


forms.forEach(buttonos => buttonos.addEventListener('submit', addItem));





