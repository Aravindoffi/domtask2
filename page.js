const url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
const req = new XMLHttpRequest();
let obj; // To store the parsed JSON data
const itemsPerPage = 10;
let currentPage = 1;

req.addEventListener("load", function () {
    obj = JSON.parse(this.response);
    console.log(obj.length)
    updateTable(obj);
    updatePagination();
});

req.open("GET", url);
req.send();

function updateTable(data) {
    const body = document.getElementById("tbody");
    var table = document.getElementById('table');
    body.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const val = data[i];
        body.innerHTML += `
            <tr>
                <td>${val.id}</td>
                <td>${val.name}</td>
                <td>${val.email}</td>
            </tr>`;
    }
}

function updatePagination() {
    const pagination = document.getElementById("pagination");
    const buttonsContainer = document.getElementById("buttons");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(obj.length / itemsPerPage);

    buttonsContainer.innerHTML = `
        <button class="btn btn-primary ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage('first')">First</button>
        <button class="btn btn-primary ${currentPage === 1 ? 'disabled' : ''} ml-2" onclick="changePage('prev')">Previous</button>`;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>`;
    }

    buttonsContainer.innerHTML += `
        <button class="btn btn-primary ${currentPage === totalPages ? 'disabled' : ''} ml-2" onclick="changePage('next')">Next</button>
        <button class="btn btn-primary ${currentPage === totalPages ? 'disabled' : ''} ml-2" onclick="changePage('last')">Last</button>`;
}
function changePage(page) {
    const totalPages = Math.ceil(obj.length / itemsPerPage);

    if (page === 'first') {
        currentPage = 1;
    } else if (page === 'last') {
        currentPage = totalPages;
    } else if (page === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (page === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (typeof page === 'number') {
        currentPage = page;
    }

    updateTable(obj);
    updatePagination();
}