const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const totalCostDisplay = document.getElementById('totalCost');
const allCheckBoxes = document.querySelectorAll('.checkboxes');
let total;

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
  displayGiftInfo(data);
  calculateTotalCost(data);
};

const displayGiftInfo = (giftData) => {
  tableBody.innerHTML = '';
  giftData.forEach(info => {
    tableBody.innerHTML += `
    <tr>
      <td>${info.recipient}</td>
      <td><a href="${info.link}">${info.name}</a></td>
      <td>$${info.priceInDollars}</td>
      <td><input class="checkboxes" type="checkbox" id=${info.id} value=${info.priceInDollars}></td>
    </tr>
    `;
  });
}

const calculateTotalCost = (giftData) => {
  total = giftData.reduce((sum, item) => {
    sum += parseInt(item.priceInDollars);
    return sum;
  }, 0);
  totalCostDisplay.innerText = "$" + total;
}

const reduceTotalCost = (event) => {
  if (event.target.checked) {
    total -= parseInt(event.target.value);
  } else {
    total += parseInt(event.target.value);
  } 
  let newTotal = total;
  totalCostDisplay.innerText = "$" + newTotal;
}

// const reduceTotalCost = (event) => {
//   allCheckBoxes.forEach(checkBox => {
//     if (event.target.checked && (event.target.id === checkBox.id)) {
//     total -= parseInt(event.target.value);
//     } else if (!event.target.checked && (event.target.id === checkBox.id)) {
//     total += parseInt(event.target.value);
//     }
//   })
//   let newTotal = total;
//   totalCostDisplay.innerText = "$" + newTotal;
// }


window.addEventListener('load', loadAPI);
tableBody.addEventListener('click', (event) => {
  reduceTotalCost(event);
})
// allCheckBoxes.addEventListener('change', (event) => {
//   reduceTotalCost(event);
// })
