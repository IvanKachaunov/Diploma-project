let deleteRowModal = document.getElementById("deleteRowModal");
let editRowModal = document.getElementById("editRowModal");
let modalContentEditContainer = document.querySelector(".inputInfo-container-edit");
let deleteRowButton = document.getElementById("delete-row-button");
let editRowButton = document.getElementById("edit-row-button");
let usernameModalDelete = document.getElementById("username-delete");
let passwordModalDelete = document.getElementById("password-delete");
let usernameLabelEdit = document.querySelector("#usernameLabel-edit");
let usernameModalEdit = document.getElementById("username-edit");
let passwordLabelEdit = document.querySelector("#passwordLabel-edit");
let passwordModalEdit = document.getElementById("password-edit");
let closeEditModal = document.querySelector(".close-editModal");
let closeDeleteModal = document.querySelector(".close-deleteModal");
let editingBilki = "";
let removedElement = "";
let editingBolka = "";
let tableTD = "";
let createEditedLabelBolka = "";
let createEditedInputBolka = "";
let createEditedLabelBilki = "";
let createEditedInputBilki = "";
let createEditedButton = "";

deleteRowButton.addEventListener("click", () => {
    if (usernameModalDelete.value !== "admin" || passwordModalDelete.value !== "admin") {
        alert("No valid information, can't proceed!");
        usernameModalDelete.value = "";
        passwordModalDelete.value = "";
        deleteRowModal.style.display = "none";
    } else {
        removedElement.remove();

        usernameModalDelete.value = "";
        passwordModalDelete.value = "";
        deleteRowModal.style.display = "none";

        // Update display and pagination
        updateTableDisplay();
        setupPagination(Math.ceil((table.querySelectorAll('tr').length - 1) / rowsPerPage));
    }
});

// Event listener for Edit Row button
editRowButton.addEventListener("click", () => {
    if (usernameModalEdit.value !== "admin" || passwordModalEdit.value !== "admin") {
        alert("No valid information, can't proceed!");
        usernameModalEdit.value = "";
        passwordModalEdit.value = "";
        editRowModal.style.display = "none";
    } else {
        usernameLabelEdit.style.display = "none";
        usernameModalEdit.style.display = "none";
        passwordLabelEdit.style.display = "none";
        passwordModalEdit.style.display = "none";
        editRowButton.style.display = "none";
        closeEditModal.style.display = "none";
        createEditedLabelBolka = document.createElement("label");
        createEditedInputBolka = document.createElement("input");
        createEditedLabelBilki = document.createElement("label");
        createEditedInputBilki = document.createElement("input");
        createEditedButton = document.createElement("button");

        createEditedLabelBolka.textContent = " Болка / Болест: ";
        createEditedLabelBilki.textContent = " Билки ";
        createEditedButton.textContent = "Edit Current Row";
        modalContentEditContainer.append(createEditedLabelBolka, createEditedInputBolka);
        modalContentEditContainer.append(createEditedLabelBilki, createEditedInputBilki);
        modalContentEditContainer.append(createEditedButton);
        closeEditModal.style.display = "flex";

        createEditedButton.onclick = function(){
            if (createEditedInputBolka.value == "" || createEditedInputBilki.value == "") {
                alert("No valid information, can't proceed!")
            } else{
                tableTD[0].innerHTML = createEditedInputBolka.value;
                tableTD[1].innerHTML = createEditedInputBilki.value;
                createEditedLabelBolka.remove();
                createEditedInputBolka.remove();
                createEditedLabelBilki.remove();
                createEditedInputBilki.remove();
                createEditedButton.remove();
                usernameLabelEdit.style.display = "inline";
                usernameModalEdit.style.display = "inline";
                passwordLabelEdit.style.display = "inline";
                passwordModalEdit.style.display = "inline";
                editRowButton.style.display = "inline";
                closeEditModal.style.display = "inline";
                editRowModal.style.display = "none"; 
            }
        }
        
        // Reset form and hide modal
        usernameModalEdit.value = "";
        passwordModalEdit.value = "";
    }
});

// Event listener for table click
table.addEventListener('click', (event) => {
    if (event.target.textContent === 'Delete') {
        removedElement = event.target.closest('tr');
        deleteRowModal.style.display = "flex";
    }

    if(event.target.textContent === 'Edit'){
        editingBilki = event.target.closest('tr');
        tableTD = editingBilki.querySelectorAll("table td");
        editRowModal.style.display = "flex";
    }
});


closeDeleteModal.onclick = function() {
    resetModalDelete();
};

closeEditModal.onclick = function() {
    resetModalEdit();
};

window.onclick = function(event) {
    if (event.target == editRowModal) {
        resetModalEdit();
    }
    else if (event.target == deleteRowModal) {
        resetModalDelete();
    }
    else if (event.target == modal) {
        resetModalForm();
    }
};

function resetModalDelete() {
    deleteRowModal.style.display = "none";
}

function resetModalEdit() {
    editRowModal.style.display = "none";    
    usernameLabelEdit.style.display = "inline";
    usernameModalEdit.style.display = "inline";
    passwordLabelEdit.style.display = "inline";
    passwordModalEdit.style.display = "inline";
    editRowButton.style.display = "inline";
    closeEditModal.style.display = "inline";
    createEditedLabelBolka.remove();
    createEditedInputBolka.remove();
    createEditedLabelBilki.remove();
    createEditedInputBilki.remove();
    createEditedButton.remove();
}