var siteName = document.getElementById("sitename");
var siteURL = document.getElementById("siteurl");
var table_body = document.getElementById("table-data");
var modal = document.querySelector(".d-changer")
var allSites;
var index;
if (localStorage.getItem("allSites") != null) {
    allSites = JSON.parse(localStorage.getItem("allSites"));
    diplay()
} else {
    allSites = [];
}

function get_site() {
    if (input_valdation() && input_valdationu()) {
        var site = {
            name: siteName.value,
            site_url: siteURL.value,
        }
        allSites.push(site);
        clear();
        diplay();
        localStorage.setItem("allSites", JSON.stringify(allSites));
        modal.classList = "d-none";
        document.querySelector(".modal-backdrop").classList.add("d-none")

    } else {
        show_dialog();
    }

}

function show_dialog() {
    modal.classList = "d-block";
    document.querySelector(".modal-backdrop").classList.remove("d-none")
}

function diplay() {
    var container = "";
    for (var i = 0; i < allSites.length; i++) {
        container += `<div class="row py-2 align-items-baseline">
        <div class="col-3 p-0">
            <p class = "editor_need">${allSites[i].name}</p>
            <input type = "text" class = "form-control edit d-none">
        </div>
        <div class="col-3">
            <a target ="_blank" href="${allSites[i].site_url}" class="btn btn-outline-success">Visit</a>
        </div>
        <div class="col-3">
            <button class="btn btn-outline-danger" onclick ="deleteElement(${i})">Delete</button>
        </div>
        <div class="col-3">
            <button class="btn btn-outline-warning" onclick = "formPrepar(${i})">Update</button>
        </div>
    </div>`
    }
    table_body.innerHTML = container;
}

function deleteElement(index) {
    allSites.splice(index, 1);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    diplay()
}
var bookmarkregex = /[a-z]{4}/;
var urlregex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
function input_valdation() {
    if (no_repeat() && bookmarkregex.test(siteName.value)) {
        siteName.classList = "is-valid form-control";
        return true;
    } else {
        siteName.classList = "form-control is-invalid";
        return false;
    }
}

function input_valdationu() {
    if (urlregex.test(siteURL.value)) {
        siteURL.classList = "is-valid form-control";
        return true;

    } else {
        siteURL.classList = "form-control is-invalid"
        return false;
    }
}
var flag = true;
function no_repeat() {

    for (var i = 0; i < allSites.length; i++) {
        if (siteName.value == allSites[i].name) {
            flag = false;
            siteName.classList = "form-control is-invalid";
            break;
        } else {
            flag = true;

        }
    }
    return flag;
}
function clear() {
    siteName.value = "";
    siteURL.value = "";
}

function formPrepar(ele) {
    var update_btn = document.querySelector(".btn-outline-warning");
    if (update_btn.innerHTML == "Update") {
        document.querySelector(".edit").classList.replace("d-none", "d-block");
        document.querySelector(".editor_need").classList.add("d-none");
        document.querySelector(".btn-outline-warning").innerHTML = "Confirm";
        index = ele;
    }else{
        UpdateElement()
    }
}

function UpdateElement() {
    allSites[index].name = document.querySelector(".edit").value;
    document.querySelector(".edit").classList.replace("d-block", "d-none");
    document.querySelector(".editor_need").classList.add("d-block");
    document.querySelector(".btn-outline-warning").innerHTML = "Update";
    diplay()
}