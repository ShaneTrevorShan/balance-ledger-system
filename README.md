Ledger Balance System - Money Pot

A simple browser app for tracking the balance from your salary, after deducting expenses and investment. A progress bar tracing a share of the amounts keyed. Also, included is a currency converter with live API to check the amount in different currency. This app build with plain HTML, JavaScript, styled using CSS and Bootstrap.

Features
Live budget table: enter your salary and expenses (Food, Rent, Others, Investment). Notice that there is no "calculate" buton because everything is recalculated on each keystroke.
Percentage bars: each row shows a coloured progress bar with the percentage of from the expenses and balance. Capped to 100% so it doesn't overflow.
Remaining / Overspent row: the last row shows the balance from your salary. If positive balance. the row shows Remaining, turns green with a message to save. The row turns red for Negative balance, labelled Overspent where the bar show a negative percentage. 0 balance stays neutral.
Summary box: shows the net balance with its percentage of income, and a message that changes with your balance. The box is gold when you are in the green and red when you overspend, and shows nothing when the balance is exactly zero.
Currency conversion: pick a currency from the dropdown (MYR or USD). Amounts already typed in are converted using exchange rates from the Frankfurter API, and the currency label next to each input updates. If the rates cannot be loaded (for example when offline), the app stays in MYR and shows a message.
Personalised greeting: the full name from the User class used in the greeting and in the summary messages.
Responsive layout: using Bootstrap to align grids, input groups and make the table responsive so the page will not break on narrow screens (the table scrolls sideways).
Animated touches: hovering over the "Money Pot" title turns it gold and makes it bigger with coins jumping out of it.

Coming soon!

1. Side panel to save monthly ledger.
2. Add wishlist to fulfil i.e. travelling, investment plan, purchasing item.
3. Piggybank that adds up the monthly remainings filling up the progress bar.
