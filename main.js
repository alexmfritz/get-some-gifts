const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const totalCostDisplay = document.getElementById('totalCost');
const allCheckBoxes = document.querySelectorAll('.checkboxes');
let giftData;
let totalCost;

async function fetchGiftData() {
  try {
    const response = await fetch("https://mysterious-mesa-00016.herokuapp.com/items");
    const data = await response.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
}

async function loadAPI() {
  const data = await fetchGiftData();
  giftData = data.reduce((giftData, item) => {
      giftData.push({id: item.id, recipient: item.recipient, name: item.name, 
        link: item.link, priceInDollars: item.priceInDollars})
      return giftData;
      }, []);
  displayGiftInfo();
  calculateTotalCost();
  displayTotalCost();
};

const displayGiftInfo = () => {
  tableBody.innerHTML = '';
  giftData.forEach(info => {
    tableBody.innerHTML += `
    <tr>
      <td>${info.recipient}</td>
      <td><a href="${info.link}">${info.name}</a></td>
      <td>$${info.priceInDollars}</td>
      <td><input class="checkboxes" type="checkbox" id="${info.id}" value="${info.priceInDollars}"></td>
    </tr>
    `;
  });
}

const calculateTotalCost = () => {
  totalCost = giftData.reduce((sum, item) => {
    sum += item.priceInDollars;
    return sum;
  }, 0);
  return totalCost;
}

const displayTotalCost = () => {
  totalCostDisplay.innerText = `$${calculateTotalCost()}`;
}


window.addEventListener('load', loadAPI);
// table.addEventListener('click', (event) => {
//   reduceTotalCost(event);
// })