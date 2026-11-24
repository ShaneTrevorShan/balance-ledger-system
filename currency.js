//default currency in MYR
let currency = 'MYR';
let rates = { MYR: 1 };

//load rates from internet currency exchange api
async function loadRates() {
  //async / await: fetching from the internet takes time, so await pauses that function until the answer arrives, without freezing the page.
  try {
    const res = await fetch(
      'https://api.frankfurter.dev/v1/latest?base=MYR&symbols=USD,SGD,EUR,GBP,JPY'
    );
    const data = await res.json();
    rates = { MYR: 1, ...data.rates };
  } catch (err) {
    //try / catch: if you’re offline or the API is down, the app keeps working in RM.
    console.log('Could not load exchange rates:', err);
  }
}

//converting MYR to other currency
function money(value) {
  return new Intl.NumberFormat('en-MY', {
    //Intl.NumberFormat: adds the right symbol, decimals and separators for each currency, and puts the minus sign in the right place. This replaces the manual RM text from before.
    style: 'currency',
    currency: currency,
  }).format(value);
}
