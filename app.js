let createRowButton = document.querySelector("#addTable");
let modal = document.getElementById("myModal");
let modalInfoContainer = document.querySelector(".inputInfo-container");
let span = document.getElementsByClassName("close")[0];
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

let pagination = document.getElementById('pagination');
let currentPage = 1;
const rowsPerPage = 7;

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

    trs.forEach((tr, index) => {
        if (index >= startIndex && index < endIndex) {
            tr.style.display = '';
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

window.onclick = function(event) {
    if (event.target == modal) {
        resetModalForm();
    }
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
        createLabelPainElement.textContent = "Болка / Болест: ";
        createInputPainElement = document.createElement("input");
        modalInfoContainer.appendChild(createLabelPainElement);
        modalInfoContainer.appendChild(createInputPainElement);

        createLabelSecondElement = document.createElement("label");
        createLabelSecondElement.textContent = "Билки: ";
        createInputSecondElement = document.createElement("input");
        modalInfoContainer.appendChild(createLabelSecondElement);
        modalInfoContainer.appendChild(createInputSecondElement);

        createNewButtonModal = document.createElement("button");
        createNewButtonModal.textContent = "Add New Row";
        modalInfoContainer.appendChild(createNewButtonModal);

        createNewButtonModal.addEventListener("click", () => {
        if(createInputPainElement.value == "" || createInputSecondElement.value == ""){
            alert("No valid information, can't proceed!");
        } else{
            addNewRow();
            setupPagination();
            updateTableDisplay();
            resetModalForm();
        }
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
    if (createNewButtonModal) {
        createNewButtonModal.remove();
    }
}
