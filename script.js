const moviesTable = document.querySelector('.table-movies');
const seriesTable = document.querySelector('.table-series');
const booksTable = document.querySelector('.table-books');
const gamesTable = document.querySelector('.table-games');

const moviesButton = document.querySelector('#movies-button');
const seriesButton = document.querySelector('#series-button');
const booksButton = document.querySelector('#books-button');
const gamesButton = document.querySelector('#games-button');

const buttons = [moviesButton, seriesButton, booksButton, gamesButton];
let forms = document.querySelectorAll('.add-panel');
let ul = document.querySelectorAll('ul');

const movies = [];
const series = [];
const books = [];
const games= [];

items = JSON.parse(localStorage.getItem('items')) || [movies, series, books, games];

const addNewButton = document.querySelector('.add-new-button');
const exit = document.querySelector('.exit-dialogue');
const save = document.querySelector('.save');
const board = document.querySelector('.tables');


/*console.log(items);*/

const addItem = (event) => {
	console.log('click')
	event.preventDefault()// stops from reloading

	let input = event.target.firstElementChild;
	let index = event.target.children[1].dataset.index;
	console.log("input", input);
	console.log("index", index);

	items[index-1].push({name: input.value, done: false});
	
	localStorage.setItem('items', JSON.stringify(items));



	input.value = '';
	updateTables();



}


 const toggleDone = (e) => {

    /*if (!e.target.matches('input')) return; //skip this unless its an input*/
    const el = e.target.previousElementSibling;
    const index = el.dataset.index;
    const id = el.dataset.id;
  
    items[index][id].done = !items[index][id].done;
    localStorage.setItem('items', JSON.stringify(items));
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

const deleteTable = (e) => {
	console.log('click')
	console.log(e.target.parentNode.dataset.index);
	const tableToRemove = e.target.parentNode
	const index = tableToRemove.dataset.index;
	document.querySelector('.tables').removeChild(tableToRemove);
	items.splice(index-1, index);
		localStorage.setItem('items', JSON.stringify(items));
		if (index > 4) {
			const itemToRemove = (index - 3).toString();
			localStorage.removeItem(itemToRemove);
		}
		
		updateTables();

}



const updateTables = () => {

	ul = document.querySelectorAll('ul');


	for (let n=0; n<ul.length; n++) {
		ul[n].innerHTML = items[n].map((item, i) => {
			return `
			<li>
			<input type="checkbox" data-index=${n} data-id="${i}" ${item.done ? 'checked' : ''}/>
			<label class="li-label" for="item${i}">${item.name}</label><button><img src="./img/delete.png" class="delete-img"></button>
			</li>

			`
		}).join(''); 

	};
	let deleteButtons = document.querySelectorAll('.delete-img');
	deleteButtons.forEach(button => button.addEventListener('click', deleteItem));

	document.querySelectorAll('.li-label').forEach(li=>li.addEventListener('click', toggleDone));

	forms = document.querySelectorAll('.add-panel');
	forms.forEach(buttonos => buttonos.addEventListener('submit', addItem));

	let deleteTableButtons = document.querySelectorAll('.delete-table');
	deleteTableButtons.forEach(button => button.addEventListener('click', deleteTable))

}

const createTableElement = (title, img, index) => {
		let newTable = document.createElement('div');
	newTable.classList.add('table');
	newTable.classList.add('custom-table');
	newTable.setAttribute("data-index", `${index}`);
	board.appendChild(newTable);

	newTable.innerHTML = 

		`	<p class="exit delete-table">X</p>
			<div class="header">
					
				<img src="img/${img}.png">
				<div class="main">
					<h2>${title}</h1>

						<form class="add-panel">
							<input  class="item-input" type="text">
							<input type="submit" data-index =${index} value="Add">
						</form>
					
				</div>
			</div>
			<ul>
			</ul>`;

			updateTables();

		
}


if (localStorage.length > 1) { 

	for (let i=2; i<=localStorage.length; i++) {
		let name = i.toString();
		const array = localStorage.getItem(name).split(",");
		
		title = array[0];
		img = array[1];
		index = array[2];

		createTableElement(title, img, index);
		
	}

}








/*updateTables();*/

const showTableDialogue = () => {
	document.querySelector('.top-layer').style.display = "block";
}

const exitDialogue = () => {
	document.querySelector('.top-layer').style.display = "none";
}



const addNewTable = (e) => {
	e.preventDefault();
	const title = event.target.parentNode.children[2].value;
	const img = document.querySelector('input[name="icons"]:checked').value;
	let index = items.length + 1;
	


	document.querySelector('.top-layer').style.display = "none";

	
	items[index-1] = [] ;
	localStorage.setItem('items', JSON.stringify(items));
	localStorage.setItem(localStorage.length + 1, [title, img, index]);
	createTableElement(title, img, index);

	
}

/*
document.querySelectorAll('.li-label').forEach(li=>li.addEventListener('click', toggleDone));*/





updateTables();

addNewButton.addEventListener('click', showTableDialogue);

exit.addEventListener('click', exitDialogue);
save.addEventListener('click', addNewTable);
