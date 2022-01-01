const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const totalCostDisplay = document.getElementById('totalCost');
const allCheckBoxes = document.querySelectorAll('.checkboxes');
const inputID = document.getElementById('id');
const inputRecipient = document.getElementById('recipient');
const inputGiftName = document.getElementById('gift');
const inputLink = document.getElementById('link');
const inputPrice = document.getElementById('price');
const submitButton = document.getElementById('submit-btn');
const deleteID = document.getElementById('deleteID');
const deleteButton = document.getElementById('delete-btn');
let total;

const fetchGiftData = () => {
  return fetch("https://mysterious-mesa-00016.herokuapp.com/items")
    .then(response => response.json())
    .then(data => renderPage(data))
    .catch(error => console.log(error))
}

const postNewGiftData = () => {
  console.log('A');
  fetch('https://mysterious-mesa-00016.herokuapp.com/items', {
    method: 'POST',
    body: JSON.stringify({id: parseInt(inputID.value), recipient: inputRecipient.value, 
      name: inputGiftName.value, link: inputLink.value, priceInDollars: parseInt(inputPrice.value)}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const submitNewGift = () => {
  postNewGiftData();
  fetchGiftData();
}

const displayGiftInfo = (giftData) => {
  tableBody.innerHTML = '';
  giftData.forEach(info => {
    tableBody.innerHTML += `
    <tr>
      <td>${info.id}) ${info.recipient}</td>
      <td><a href="${info.link}">${info.name}</a></td>
      <td>$${info.priceInDollars}</td>
      <td><input class="checkboxes" type="checkbox" id=${info.id} value=${info.priceInDollars}></td>
    </tr>
    `;
  });
}

const renderPage = (giftData) => {
  displayGiftInfo(giftData);
  renderTotalCost(giftData);
}

const calculateTotalCost = (giftData) => {
  return giftData.reduce((sum, item) => {
    sum += item.priceInDollars;
    return sum;
  }, 0);
}

const renderTotalCost = (giftData) => {
  total = calculateTotalCost(giftData);
  totalCostDisplay.innerText = "$" + total;
}

const reduceTotalCost = (event) => {
  if (event.target.checked && event.target.classList.contains('checkboxes')) {
    total -= parseInt(event.target.value);
  } else if (!event.target.checked && event.target.classList.contains('checkboxes')) {
    total += parseInt(event.target.value);
  } 
  let newTotal = total;
  totalCostDisplay.innerText = "$" + newTotal;
}

const deleteGiftData = () => {
  fetch(`https://mysterious-mesa-00016.herokuapp.com/items/${deleteID.value}`, {method: 'DELETE'})
    .catch(error => console.log(error))
}

tableBody.addEventListener('click', (event) => {
  reduceTotalCost(event);
})
submitButton.addEventListener('click', () => {
  submitNewGift();
});

deleteButton.addEventListener('click', deleteGiftData);

fetchGiftData();