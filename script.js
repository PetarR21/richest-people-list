const draggableList = document.querySelector('#draggable-list');
const checkButton = document.querySelector('#check');


const richestPeopleList = ['Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

const listItems = [];
let dragStartIndex;

function createList() {
    [...richestPeopleList].map(a => ({ value: a, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(a => a.value).forEach((person, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        draggableList.appendChild(listItem);
        listItems.push(listItem);
    })

    addEventListeners();

}

function swapItems(fromIndex,toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');

}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    
    this.classList.remove('over');
}

function checkOrder(){
    listItems.forEach((item,index) =>{
        const name = item.querySelector('.person-name').textContent.trim();
        
        if(name !== richestPeopleList[index]){
            item.classList.add('wrong');
        }else{
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    })
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('#draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
    })

    checkButton.addEventListener('click',checkOrder);
}

createList();


