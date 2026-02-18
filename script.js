const balance = document.getElementById("balance");
const income = document.getElementById("inc-amt");
const expense = document.getElementById("exp-amt");
const form = document.getElementById("form");
const trans = document.getElementById("trans");
const description = document.getElementById("description");
const amount = document.getElementById("amount");

// import dummy data to array
// let dummyData = [
//   { id: 1, text: "Salary", amount: 25000 },
//   { id: 2, text: "Petrol", amount: -100 },
//   { id: 3, text: "Shares", amount: 50000 },
//   { id: 4, text: "books", amount: -300 }
// ];
// let transactions = dummyData;

const localStorageTransaction = JSON.parse(localStorage.getItem("Transaction_Details"));
let transactions = localStorage.getItem("Transaction_Details") !== null ? localStorageTransaction : [];

function loadtransaction(transaction) {
  //  console.log(transaction)
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add("list");
  item.classList.add(transaction.amount < 0 ? "red" : "green");
  item.innerHTML = `
  ${transaction.text}
  <span>${sign} ${Math.abs(transaction.amount)}</span>
  <button class="btn" onclick="removetrans(${transaction.id})">x</button>
  `;
  trans.appendChild(item)
  // console.log(item);
}
function removetrans(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {

    transactions = transactions.filter(transaction =>
      transaction.id !== id
    );

    config();
    updateLocalStorage();
  }
  else {
    return;
  }
}

function updateAmount() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc = acc + item, 0);
  balance.innerHTML = `₹ ${total}`
  // income amount
  const inc = amounts.filter((item) => item > 0).reduce((acc, item) => acc = acc + item, 0);
  income.innerHTML = `₹ ${inc}`
  // expense amount
  const exp = amounts.filter((item) => item < 0).reduce((acc, item) => acc = acc + item, 0);
  expense.innerHTML = `₹ ${Math.abs(exp)}`

}
function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter description and amount")
  } else {
    const transaction = {
      id: uniqueID(),
      text: description.value,
      amount: +amount.value
    };
    transactions.push(transaction);
    loadtransaction(transaction);
    description.value = "";
    amount.value = "";

    updateAmount();
    updateLocalStorage();
  }
}
function uniqueID() {
  return Math.floor(Math.random() * 1000000000);
}

form.addEventListener("submit", addTransaction);

function config() {
  trans.innerHTML = "";
  transactions.forEach(loadtransaction);
  updateAmount()
}

window.addEventListener("load", function () {
  config();
})

function updateLocalStorage() {
  localStorage.setItem("Transaction_Details", JSON.stringify(transactions));
}