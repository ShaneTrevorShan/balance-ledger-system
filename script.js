//Ledger Balance System  /* Ledger Balance System change to //Ledger Balance System    */

import { User } from './user.js'; //from const User = require('./user.js) to import { User } from './user.js';

const person = new User('Muhamad Abu Bakar', 'Bin Rashid'); //const person = new User("Bin Rashid", "Muhamad Abu Bakar"), switch places for firstName and lastName;

const greeting = document.getElementById('greeting');
greeting.textContent = `Welcome, ${person.fullname}!`; //greeting.textContent = `Welcome, ${person.fullname?.lastName}!`, remove ?.lastName;

const expenses = ['food', 'rent', 'others', 'saving'];

function calculate() {
  const salary = Math.max(0, Number(document.getElementById('salary').value) || 0); //MATH.max(0, x) returns number that are larger and prevent negative number

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    const val = Math.max(0, Number(document.getElementById(expenses[i]).value) || 0); //ADD Math.max(0, x)
    total += val;
  }

  const balance = salary - total; 
  const percent = salary > 0 ? (balance / salary) * 100 : 0; //IF salary is 0, prevent percent from -NaN or -infinity
  const amount = balance < 0 ? `-RM${Math.abs(balance).toFixed(2)}` : `RM${balance.toFixed(2)}`;  //SHOW minus sign after RM. Math.abs removes minus from number

  const result = document.getElementById('result');
  result.textContent = `Net Balance: ${amount} (${percent.toFixed(2) + '%'} of income)`; //CHANGE balance to amount, toFixed(1) to toFixed(2)

  result.style.backgroundColor = balance >= 0 ? '#d4edda' : '#f8d7da';
  result.style.color = balance >= 0 ? '#155724' : '#721c24';
}
document.getElementById("calc-btn").addEventListener("click", calculate); //add event listener for calculate button in index.html

document.querySelectorAll('.form input').forEach((input) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9.]/g, '');
  });
});  //replace(/[^0-9.]/g, '') means "remove every character that is not a digit or a dot". The ^ inside the brackets means "not". The cleanup runs after each keystroke or paste, so letters, -, + and e vanish instantly, and a pasted -5abc becomes 5.
