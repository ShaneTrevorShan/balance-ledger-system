function buildTable(items) {
  const tbody = document.getElementById('table-body');

  //salary row input and bar
  let html = `
    <tr>
      <td>Salary</td>
      <td>Inflow</td>
      <td>
        <div class="input-group">
          <span class="input-group-text cur">${currency}</span>
          <input type="number" class="form-control" id="salary" placeholder="0" step="any">
        </div>
      </td>
      <td></td>
    </tr>
  `;

  // one row per expense, with an input and an empty bar. barHTML use item.id to assign item.color to the bar
  for (const item of items) {
    html += `
      <tr>
        <td>${item.label}</td>
        <td>${item.type}</td>
        <td>
          <div class="input-group">
            <span class="input-group-text cur">${currency}</span>
            <input type="number" class="form-control" id="${
              item.id
            }" placeholder="0" step="any">
          </div>
        </td>
        <td>${barHTML(item.id, item.color)}</td>
      </tr>
    `;
  }

  // create remaining row of the salary balance
  html += `
    <tr id="remaining-row">
      <td id="remaining-label">Remaining</td>
      <td id="remaining-type"></td>
      <td id="remaining-amount">0</td>
      <td>${barHTML('remaining', 'blue')}</td>
    </tr>
  `;

  tbody.innerHTML = html;
}

//create colored bars for the id with number percentage showing
function barHTML(id, color) {
  return `
  <div class="bar-track">
  <div class="bar-fill" id="${id}-bar" style="width: 0%; background-color: ${color};"></div>
  <span class="bar-text" id="${id}-text">0.0%</span>
  </div>
  `;
}

//create the bar responding with the amount
function updateBar(id, amount, salary) {
  const percent = salary > 0 ? (amount / salary) * 100 : 0;
  document.getElementById(`${id}-bar`).style.width =
    Math.min(Math.abs(percent), 100) + '%';
  document.getElementById(`${id}-text`).textContent = percent.toFixed(1) + '%';
}
