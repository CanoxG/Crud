// Ihtiyacimiz olan elementleri seciyoruz
const toDoList = document.querySelector('.list');
const search = document.querySelector('.search');
const newTaskInput = document.querySelector('.newTaskInput');
const btn = document.querySelector('.btn');

// inputa event listener ekle yeni todo eklemek icin change ile enter a basinca
newTaskInput.addEventListener('change', addToDoList);

// add buttonuna ekliyoruz basilinca todo eklemesi icin click ile
btn.addEventListener('click', addToDoList);

// add eventlistener to search 
search.addEventListener('change', (event) => {
  // value = event.target.value
  // searchInput.value = "";
  const {
    value // const value ile ayni
  } = event.target;
  if (!toDoList.childNodes.length) return;

  if (value) {
    for (let li of toDoList.childNodes) {
      const span = li.childNodes[0];
      const txt = span.innerText;
      if (!txt.includes(value)) li.style.display = "none";
      else li.style.display = 'flex';
    }

    Array.from(toDoList.childNodes).forEach((li) => {
      const span = li.childNodes[0];
      const txt = span.innerText;
      if (!txt.includes(value)) {   
        li.style.display = "none";
      } else {
        li.style.display = 'flex';
      }
    })
  } else {
    Array.from(toDoList.childNodes).forEach((li) => {
      li.style.display = "flex";
    })
  }
})

// gerekli fonsyonlari yaratiyoruz
// Add toDolist
// check is if the input is empty
// empty degilse yeni bir li yarat
// nodechild in en ustune ekle 

function addToDoList() {
  const txt = newTaskInput.value;
  if (!txt) {

  } else {
    const li = createToDoItem(txt);
    const ilkItem = toDoList.childNodes[0];
    toDoList.insertBefore(li, ilkItem);
  }
  newTaskInput.value = "";
}

// 1. Todo li elementi yarat
// bir id yaratiyoruz childnode length ile
// SPAN ve button yaratip ekle
// li a id ekliyoruz

function createToDoItem(txt) {
  const li = document.createElement('li');
  const id = `to-do-item${toDoList.childNodes.length}`;
  li.appendChild(createSpanElement(txt));
  li.appendChild(createDeleteButton(id));
  li.id = id;

  return li;
}

// 1.1 bir span elementi yarat
// span elementin icine text ekle
// eventlistener ekle tiklayinca cizsin ustunu
// span ni dondur 

function createSpanElement(txt) {
  const span = document.createElement('span');
  span.innerText = txt;
  span.className = "toDoTex"; 
  span.addEventListener('click', onClick);

  return span;
}

// 3, Secilen todonun uzerini ciz
// event.target.style.textDecoration ile yeni deger veriliyor
// ever cizilmis ise siliniyor cizim.
// 4. Butun yaratilmis todolari filitrele

function onClick(event) {
  const element = event.target;
  if (element.style.textDecoration === "line-through") {
    element.style.textDecoration = "none";
  } else {
    element.style.textDecoration = "line-through";
  }
}

// bir button elementi yarat  
// button na icon yada text ekle
// eventlistener ekle silmek icin id ile ama data-id
// button nu dondur

function createDeleteButton(id) {
  const button = document.createElement('button');
  button.innerText = "☠️";
  button.dataset.id = id;
  button.addEventListener('click', removeListItem);

  return button;
}

// 2. Secilen todo elementi sil
// event.target.dataset.id den id yi al
// id ile domdan gerekli child secilir
// secilenElement.remove(); siliyoruz domdan
// todoListCache = todoListCache.filter((item) => item.id !== id)

function removeListItem(event) {
  const element = event.target;
  const id = element.dataset.id;
  const listItem = document.querySelector(`#${id}`);

  listItem.remove();
}