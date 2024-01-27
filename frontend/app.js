let createRowButton = document.querySelector("#addTable");
let modal = document.getElementById("createRowModal");
let modalInfoContainer = document.querySelector(".inputInfo-container");
let span = document.getElementsByClassName("close-createRowModal")[0];
let createRowButtonModal = document.querySelector("#create-row-button");
let usernameModal = document.querySelector("#username");
let passwordModal = document.querySelector("#password");
let usernameLabel = document.querySelector("#usernameLabel");
let passwordLabel = document.querySelector("#passwordLabel");
let table = document.querySelector("table");

let createLabelPainElement = "";
let createLabelSecondElement = "";
let createInputSecondElement = "";
let createInputPainElement = "";
let createNewButtonModal = "";
let pageButton = "";
let herbName = "";
let painDescription = "";

let pagination = document.getElementById('pagination');
let currentPage = 1;
const rowsPerPage = 8;

// Start of Search values logic

document.getElementById('search').addEventListener('input', function(e) {
    searchTable(e.target.value);
});

function searchTable(query) {
    let trs = table.querySelectorAll('tr:not(:first-child)');
    trs.forEach(tr => {
        if (tr.textContent.toLowerCase().includes(query.toLowerCase())) {
            tr.classList.remove('search-hidden');
        } else {
            tr.classList.add('search-hidden');
        }
    });
    updatePaginationBasedOnSearch();
}

function updatePaginationBasedOnSearch() {
    let visibleRows = Array.from(table.querySelectorAll('tr:not(.search-hidden)')).length - 1;
    let pageCount = Math.ceil(visibleRows / rowsPerPage);
    setupPagination(pageCount);
    updateTableDisplay();
}

function setupPagination(pageCount) {
    pagination.innerHTML = '';
    for (let i = 1; i <= pageCount; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {
            if (currentPage !== i) {
                currentPage = i;
                updateActiveButton(i);
                updateTableDisplay();
            }
        });
        pagination.appendChild(pageButton);
    }
    updateActiveButton(currentPage);
}

function updateActiveButton(activePage) {
    document.querySelectorAll('#pagination button').forEach(btn => {
        btn.classList.remove('Active');
    });
    if (activePage && pagination.children[activePage - 1]) {
        pagination.children[activePage - 1].classList.add('Active');
    }
}

function setupPagination() {
    pagination.innerHTML = '';
    let rowCount = table.querySelectorAll('tr').length - 1;
    let pageCount = Math.ceil(rowCount / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        if (i === currentPage) {
            pageButton.classList.add("Active"); // Add 'Active' class to the current page button
        }
        pageButton.addEventListener('click', () => {
            if (currentPage !== i) {
                currentPage = i;
                updateActiveButton(i); // Update active class on all buttons
                updateTableDisplay();
            }
        });
        pagination.appendChild(pageButton);
    }
}

function updateActiveButton(activePage) {
    // Remove 'Active' class from all buttons
    document.querySelectorAll('#pagination button').forEach(btn => {
        btn.classList.remove('Active');
    });
    if (activePage) {
        let currentButton = pagination.querySelector('button:nth-child(' + activePage + ')');
        if (currentButton) {
            currentButton.classList.add('Active');
        }
    }
}

function updateTableDisplay() {
    let trs = table.querySelectorAll('tr:not(:first-child)');
    let startIndex = (currentPage - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;
    let visibleIndex = 0;

    trs.forEach((tr) => {
        if (!tr.classList.contains('search-hidden')) {
            if (visibleIndex >= startIndex && visibleIndex < endIndex) {
                tr.style.display = '';
            } else {
                tr.style.display = 'none';
            }
            visibleIndex++;
        } else {
            tr.style.display = 'none';
        }
    });
}

setupPagination();
updateTableDisplay();

createRowButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

span.onclick = function() {
    resetModalForm();
};

createRowButtonModal.addEventListener("click", () => {
    if (usernameModal.value != "admin" || passwordModal.value != "admin") {
        alert("No valid information, can't proceed!");
        resetModalForm();
    } else {
        // Hide the admin login form
        usernameModal.style.display = "none";
        passwordModal.style.display = "none";
        usernameLabel.style.display = "none";
        passwordLabel.style.display = "none";
        createRowButtonModal.style.display = "none";

        // Create form fields for adding a row
        createLabelPainElement = document.createElement("label");
        createLabelPainElement.textContent = " Болка / Болест: ";
        createInputPainElement = document.createElement("input");
        createInputPainElement.setAttribute("id", "pain_description");
        modalInfoContainer.appendChild(createLabelPainElement);
        modalInfoContainer.appendChild(createInputPainElement);

        createLabelSecondElement = document.createElement("label");
        createLabelSecondElement.textContent = " Билки: ";
        createInputSecondElement = document.createElement("input");
        createInputSecondElement.setAttribute("id", "herb_name");
        modalInfoContainer.appendChild(createLabelSecondElement);
        modalInfoContainer.appendChild(createInputSecondElement);

        createNewButtonModal = document.createElement("button");
        createNewButtonModal.setAttribute("id", "rowForm");
        createNewButtonModal.setAttribute("type", "submit");
        createNewButtonModal.textContent = "Add New Row";
        modalInfoContainer.appendChild(createNewButtonModal);
        

        createNewButtonModal.addEventListener("click", () => {
        if(createInputPainElement.value == "" || createInputSecondElement.value == ""){
            alert("No valid information, can't proceed!");
        } else{
            herbName = document.getElementById('herb_name').value;
            painDescription = document.getElementById('pain_description').value;
            addNewRow();
            setupPagination();
            updateTableDisplay();
            resetModalForm();
            
        }
        
            console.log(herbName);
        
            console.log(painDescription);
        
            fetch('/add-row', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ herb_name: herbName, pain_description: painDescription }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
        });
    }
});

function addNewRow() {
    let createNewTR = document.createElement("tr");
    let createFirstNewTD = document.createElement("td");
    let createSecondNewTD = document.createElement("td");
    let createThirdNewTD = document.createElement("td");
    let createNewDivButtonContainer = document.createElement("div");
    let createDeleteButtonNew = document.createElement("button");
    let createEditButtonNew = document.createElement("button");
    let createRouteButtonNew = document.createElement("button");

    createFirstNewTD.textContent = createInputPainElement.value;
    createSecondNewTD.textContent = createInputSecondElement.value;
    createThirdNewTD.className = "third-td-row";

    createDeleteButtonNew.textContent = "Delete";
    createEditButtonNew.textContent = "Edit";
    createRouteButtonNew.textContent = "Route";
    createNewDivButtonContainer.className = "button-container";
    createNewDivButtonContainer.append(createRouteButtonNew, createDeleteButtonNew, createEditButtonNew);

    createNewTR.append(createFirstNewTD, createSecondNewTD);
    createNewTR.append(createThirdNewTD)
    createThirdNewTD.append(createNewDivButtonContainer);

    table.appendChild(createNewTR);
}

function resetModalForm() {
    modal.style.display = "none";
    usernameModal.style.display = "inline";
    usernameModal.value = "";
    passwordModal.style.display = "inline";
    passwordModal.value = "";
    usernameLabel.style.display = "inline";
    passwordLabel.style.display = "inline";
    createRowButtonModal.style.display = "inline";
    createLabelPainElement.remove();
    createInputPainElement.remove();
    createLabelSecondElement.remove();
    createInputSecondElement.remove();
    createInputPainElement.removeAttribute('id');
    createInputSecondElement.removeAttribute('id');
    if (createNewButtonModal) {
        createNewButtonModal.removeAttribute('type');
        createNewButtonModal.removeAttribute("id");
        createNewButtonModal.remove();
    }
}