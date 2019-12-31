const url = 'https://jsonplaceholder.typicode.com/todos';
const tables = document.querySelector('.users-list');
fetch(url)
  .then(resp => resp.json())
  .then(function(inf) {
    console.log('====================================');
    console.log(inf);
    console.log('====================================');

    inf.map(function(detail) {
      if (detail.id < 21) {
        const tr = document.createElement('tr');

        const id = document.createElement('td');
        id.textContent = `${detail.id}`;

        const username = document.createElement('td');
        username.textContent = `${detail.userId}`;

        const title = document.createElement('td');
        title.textContent = `${detail.title}`;
        const completed = document.createElement('td');
        completed.textContent = `${detail.completed}`;

        tr.appendChild(id);
        tr.appendChild(username);
        tr.appendChild(title);
        tr.appendChild(completed);
        tables.querySelector('tbody').appendChild(tr);
      }
    });
  });

const city = 'https://jsonplaceholder.typicode.com/users';
fetch(city)
  .then(res => res.json())
  .then(city => {
    city.map(data => {
      // if (data.id < 4) {

        let getCity = document.querySelectorAll('.city');

        for (let i = 0; i < 3; i++) {
          getCity[i].textContent = `${data.address.city}`;
        }
      // }
    });
  });

const table = document.querySelector('.users-list');

let colIndex = -1;

const sortTable = function(index, type, isSorted) {
  const tbody = table.querySelector('tbody');

  const compare = function(rowA, rowB) {
    const rowDataA = rowA.cells[index].innerHTML;
    const rowDataB = rowB.cells[index].innerHTML;

    switch (type) {
      case 'integer':
        return rowDataA - rowDataB;
        break;
      case 'boolean':
        return rowDataA === rowDataB ? false : true;
        break;
      case 'text':
        if (rowDataA < rowDataB) return -1;
        else if (rowDataA > rowDataB) return 1;
        return 0;
        break;
    }
  };

  let rows = [].slice.call(tbody.rows);

  rows.sort(compare);

  if (isSorted) rows.reverse();

  table.removeChild(tbody);

  for (let i = 0; i < rows.length; i++) {
    tbody.appendChild(rows[i]);
  }

  table.appendChild(tbody);
};

table.addEventListener('click', e => {
  const el = e.target;

  if (el.nodeName !== 'TH') return;

  const index = el.cellIndex;
  const type = el.getAttribute('data-type');

  sortTable(index, type, colIndex === index);

  colIndex = colIndex === index ? -1 : index;
});
