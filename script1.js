//Ledger Balance System  ///* Ledger Balance System    */

//const User = require('./user.js')

const person = new User('Muhamad Abu Bakar', 'Bin Rashid');

const greeting = document.getElementById('greeting');
greeting.textContent = `Welcome to ${person.fullname}'s`;

//array of expenses id and label, in/out flow, bar color
const items = [
  { id: 'food', label: 'Food', type: 'Outflow', color: '#F5DEB3' },
  { id: 'rent', label: 'Rent', type: 'Outflow', color: '#efbbf1' },
  { id: 'others', label: 'Others', type: 'Outflow', color: '#ADD8E6' },
  { id: 'investment', label: 'Investment', type: 'Invest', color: '#f7ee94' },
];

//run the function first for the table to appear
buildTable(items);

function calculate() {
  const salary = Math.max(
    0,
    Number(document.getElementById('salary').value) || 0
  ); //returns number bigger than 0

  let total = 0; //add each input amount to total
  for (const item of items) {
    const val = Math.max(
      0,
      Number(document.getElementById(item.id).value) || 0
    );
    total += val;
    updateBar(item.id, val, salary); //update bar for each row when there's input amount
  }

  //calculate balance after deducting expenses from salary
  const balance = salary - total;
  const percent = salary > 0 ? (balance / salary) * 100 : 0;

  //create a row to show remaining or overspent
  document.getElementById('remaining-label').textContent =
    balance >= 0 ? 'Remaining' : 'Overspent';
  document.getElementById('remaining-type').textContent =
    balance > 0 ? 'Saving 💰' : balance < 0 ? 'No steak for next month 💸' : '';
  document.getElementById('remaining-amount').textContent = `${money(balance)}`; //money(balance) change currency
  document.getElementById('remaining-bar').style.background =
    balance >= 0 ? 'lightgreen' : 'salmon';

  updateBar('remaining', balance, salary);
  document.getElementById('remaining-row').style.background =
    balance > 0 ? '#bcfd9c' : balance < 0 ? '#fd9c9c' : '';
  document.getElementById('remaining-label').style.color =
    balance > 0 ? '#206100' : balance < 0 ? '#d20000' : '';
  document.getElementById('remaining-type').style.color =
    balance > 0 ? '#206100' : balance < 0 ? '#d20000' : '';
  document.getElementById('remaining-amount').style.color =
    balance > 0 ? '#206100' : balance < 0 ? '#d20000' : '';
  document.getElementById('remaining-text').style.color =
    balance > 0 ? '#206100' : balance < 0 ? '#a40303' : '';

  //show the summary of the remaining amount
  const result = document.getElementById('result');
  result.innerHTML = `${
    balance > 0
      ? `Net Balance: ${money(balance)} (${
          percent.toFixed(2) + '%'
        } of income)<br>Go Go Go ${person.fullname}! Aim for your goal!`
      : balance < 0
      ? `Net Balance: ${money(balance)} (${
          percent.toFixed(2) + '%'
        } of income)<br>No good lah, ${
          person.fullname
        }. Eat grass for the whole next month!`
      : ''
  }`;
  result.style.backgroundColor =
    balance > 0 ? 'gold' : balance < 0 ? '#c30707' : '';
  result.style.color = balance > 0 ? '#a88f02' : balance < 0 ? '#edbdbd' : '';
}

//each time a bad input is keyed, warning message will show in result
const invalidIds = new Set(); //inputs whose last entry was rejected
function showInvalids() {
  const result = document.getElementById('result');
  result.textContent = 'Please enter a valid number';
  result.style.backgroundColor = '';
  result.style.color = '';
}

function isBadKey(event) {
  //true for a single character that is not a digit or dot
  if (event.crtlKey || event.metaKey || event.altkey) return false; //for copy, paste, select all
  if (event.key.length > 1) return false; //for named keys: backspace, tab, arrows, shifts, alternate
  return !/[0-9.]/.test(event.key);
}

document.querySelectorAll('#table-body input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (isBadKey(event)) {
      event.preventDefault();
      showInvalids();
    }
  });
  input.addEventListener('input', () => {
    //cathes pasted text, negatives and mixed numbers-alpahberts ie 1w5
    const bad = input.validity.badInput || !/^\d*\.?\d*$/.test(input.value); //regex /^\d*\.?\d*$/ means digits, then at most one dot, then digits  i.e 11.11

    if (bad) {
      input.value = ''; //throw the bad entry
      invalidIds.add(input.id);
    } else {
      invalidIds.delete(input.id);
    }
    calculate(); //redraws bars, table and results, wiping old display
    if (invalidIds.size > 0) showInvalids(); //keep the warning while the box is rejected
  });
});

//convert inputs to different currency
document.getElementById('currency').addEventListener('change', (event) => {
  //Finds the currency dropdown, trigger the currency change event, event arrow function (event) => { ... } runs
  const oldCode = currency;
  const newCode = event.target.value; // event.target the option value that is chosen

  if (!rates[oldCode] || !rates[newCode]) {
    // if rates not loaded (offline), don't switch
    event.target.value = oldCode;
    alert(`Exchange rates not available right now`);
    return;
  }

  //calculate the conversion
  const conversion = rates[newCode] / rates[oldCode];

  //convert every input
  const ids = ['salary', ...items.map((item) => item.id)]; //go thru items by id
  for (const id of ids) {
    const input = document.getElementById(id);
    if (input.value !== '') {
      input.value = (Number(input.value) * conversion).toFixed(2);
    }
  }
  currency = newCode;
  document.querySelectorAll('.cur').forEach((span) => {
    span.textContent = currency;
  });
  calculate(); //recalculate amounts into converted currency
});

loadRates().then(calculate); // fetch the exchange rates from internet and return the result that arrives later, then run calculate once the result is available. calculate has no () as it only runs when the function is called

//FOR FUN ON H1 COIN RAIN
const title = document.querySelector('h1');
let jumping = false;

function jumpCoins(count = 80) {
  const rect = title.getBoundingClientRect(); // where the h1 is on screen
  const startY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const coin = document.createElement('div'); // coin outer: does the jumping
    coin.className = 'coin-jump';

    const face = document.createElement('img'); // coin inner: does the spinning
    face.src = 'Coin.png';
    face.alt = '';
    coin.appendChild(face);

    // start at a random spot along the heading
    coin.style.left = rect.left + Math.random() * rect.width + 'px';
    coin.style.top = startY + 'px';
    document.body.appendChild(coin);

    const driftX = (Math.random() - 0.5) * 2000; // sideways travel, 2000 spread across the screen
    const peak = -(80 + Math.random() * 400); // how high it jumps, 400 height from h1
    const fall = window.innerHeight - startY + 2000; // far enough to leave the screen
    const spin = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 360);

    const anim = coin.animate(
      [
        {
          transform: 'translate(0, 0) rotate(0deg)',
          opacity: 0, //keep a coin invisible during its random delay, so coins don’t sit on the heading before they jump.
          offset: 0,
          easing: 'ease-out', //ease-out going up, the coin slows as it rises
        },
        {
          transform: 'translate(0, 0) rotate(0deg)',
          opacity: 1,
          offset: 0.01,
          easing: 'ease-out',
        },
        {
          transform: `translate(${driftX * 0.4}px, ${peak}px) rotate(${
            spin * 0.4
          }deg)`,
          offset: 0.35,
          easing: 'ease-in', //ease-in coming down copy real gravity, speeds up as it falls.
        },
        {
          transform: `translate(${driftX}px, ${fall}px) rotate(${spin}deg)`,
          offset: 1,
        },
      ],
      {
        duration: 1400 + Math.random() * 600,
        delay: Math.random() * 300,
        fill: 'backwards',
      }
    );

    anim.onfinish = () => coin.remove(); //removes each coin when it lands, so the page stays clean.
  }
}

title.addEventListener('mouseenter', () => {
  //jumping is a cooldown, so wiggling the mouse doesn’t spawn hundreds of coins.
  if (jumping) return;
  jumping = true;
  jumpCoins();
  setTimeout(() => (jumping = false), 2000); //adjust , 2000 to set the cooldown timing
});
