let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "*Name field is empty!!";
            return;
        }
        try {
            nameCheck(name.value);
            textError.textContent = "";
        } catch (exception) {
            textError.textContent = exception;
        }
    });

    const startDate = document.querySelector("#startDate");
    let newDate = new Array();
    const dateError = document.querySelector(".date-error");
    startDate.addEventListener("input", function () {
        newDate.push(document.querySelector("#day").value);
        newDate.push(document.querySelector("#month").value);
        newDate.push(document.querySelector("#year").value);
        try {
            dateCheck(newDate);
            dateError.textContent = ""; 
        } catch (exception) {
            dateError.textContent = exception;
        }
        newDate = new Array();
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    phoneNo = document.querySelector('#phoneNo');
    phoneNoError = document.querySelector('.phone-error');
    phoneNo.addEventListener( 'input', function() {
        if (phoneNo.value.length == 0) {
            phoneNoError.textContent = "*Phone No. field is empty!!";
            return;
        }
        try {
            phoneCheck(phoneNo.value);
            phoneNoError.textContent="";
        } catch (exception) {
            phoneNoError.textContent = exception;
        }
    });

    password = document.querySelector('#password');
    passwordError = document.querySelector('.password-error');
    password.addEventListener( 'input', function() {
        if (password.value.length == 0) {
            passwordError.textContent = "*Password field is empty!!";
            return;
        }
        try {
            passwordCheck(password.value);
            passwordError.textContent = "";
        } catch (exception) {
            passwordError.textContent = exception;
        }
    });
    
    checkForUpdate();
});

function phoneCheck(userId) {
    let userIdRegex = RegExp('^[0-9]{10}$')
    if (!userIdRegex.test(userId)) throw "PhoneNo. is Invalid!";
}

function passwordCheck(password) {
    let pswdRegex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$');
    if (!pswdRegex.test(password)) throw "Password is Invalid!";
}

function nameCheck(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
    if (!nameRegex.test(name)) throw "Name is Invalid!";
}

function dateCheck(startDate) {
    let newDate = new Date(startDate[2], (startDate[1] - 1), startDate[0]);
    if (!(newDate <= new Date())) throw 'Start Date is incorrect';
}

function save(){
    // event.preventDefault();
    // event.stopPropagation();
    try {
        setEmployeePayrollObject();
        if (site_properties.from_local) {
            createAndUpdateStorage();
            window.location.replace(site_properties.home_page);
        } else {
            createServer();
        }
    } catch (exception) {
        console.error(exception);
        return;
    }
}

let newData = {}
function setEmployeePayrollObject() {
    
    try {
        const output = document.querySelector('.salary-output');

        newData._name = document.getElementById('name').value;
        newData._profile_image = getRadioValue(document.getElementsByName('profile'));
        newData._gender = getRadioValue(document.getElementsByName('gender'));
        newData._department = getCheckBoxValue(document.getElementsByClassName('checkbox'));
        
        console.log(typeof(newData._department));
        newData._salary = output.textContent;

        let start = new Array();
        start.push(document.getElementById('day').value);
        start.push(document.getElementById('month').value);
        start.push(document.getElementById('year').value);
        newData._startDate = new Date(start[2], (start[1] - 1), start[0]);
        console.log(new Date(start[2], (start[1] - 1), start[0]));
        
        newData._phoneNo = document.getElementById('phoneNo').value;
        newData._password = document.getElementById('password').value;
        newData._notes = document.getElementById('notes').value;
        console.log(newData );
    }
    catch (exception) {
        console.error(exception);
    }
}

function getRadioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}
function getCheckBoxValue(boxes) {
    let boxlist = new Array();
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            boxlist.push(boxes[i].value)
        }
    }
    return boxlist;
}
function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let employeeData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
        if (!employeeData) employeePayrollList.push(createEmpData());
        else {
            const index = employeePayrollList.map(empData => empData.id)
                .indexOf(employeeData.id);
            employeePayrollList.splice(index, 1, createEmpData(employeeData.id));
        }
    } else {
        employeePayrollList = [createEmpData()];
    }
    console.log(employeePayrollList);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const createEmpData = (id) => {
    if (!id) employeePayrollObj.id = createNewEmployeeId();
    else employeePayrollObj.id = id;
    return employeePayrollObj;
}
function setEmployeePayrollData(employeePayrollData) {
    
    employeePayrollData.name = employeePayrollObj._name;
    employeePayrollData.profile_image = employeePayrollObj._profile_image;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    employeePayrollData.phoneNo = employeePayrollObj._phoneNo;
    employeePayrollData.password = employeePayrollObj._password;
   
    employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
}
const resetForm = () => {
    document.getElementById("EmpForm").reset();
    setValue('#salary', 400000);
    const output = document.querySelector('.salary-output');
    output.textContent = 400000;
    const textError = document.querySelector('.text-error');
    textError.textContent = "";
    const dateError = document.querySelector(".date-error");
    dateError.textContent = "";
    const phoneError = document.querySelector(".phone-error");
    phoneError.textContent = "";
    const passwordError = document.querySelector(".password-error");
    passwordError.textContent = "";
}
function getEmpDataFromLocalStorage() {
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
};
function createNewEmployeeId() {
    let empList = getEmpDataFromLocalStorage();
    let randID = 1;
    for (var emp in empList) {
        randID = Math.floor(Math.random() * 1000) + 1;
        if (emp.id == randID) continue;
    }
    return randID;
}
function checkForUpdate() {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    console.log(employeePayrollObj);
    setForm(employeePayrollObj);
}
let dataEmp;
const setForm = (employeePayrollObj) => {
    
    console.log(JSON.parse(employeePayrollObj),"\n",typeof(JSON.parse(employeePayrollObj)));
    dataEmp = JSON.parse(employeePayrollObj)
    let b = Object.values(dataEmp)
    console.log(dataEmp.data._name)
    console.log(dataEmp.data._startDate)
    setValue('#name', dataEmp.data._name);
    setSelectedValues('[name=profile]', dataEmp.data._profile_image);
    setSelectedValues('[name=gender]', dataEmp.data._gender);
    setCheckBox(document.getElementsByClassName('checkbox'), dataEmp.data._department);
    setValue('#salary', dataEmp.data._salary);
    setTextValue('.salary-output', dataEmp.data._salary);
    setValue('#notes', dataEmp.data._notes);
    setValue('#phoneNo', dataEmp.data._phoneNo);
    setValue('#password', dataEmp.data._password);
    let date = dataEmp.data._startDate.toString().slice(0, 10).split("-");
    setValue('#day', date[2])
    setValue('#month', date[1])
    setValue('#year', date[0]);
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
}
const setCheckBox = (boxes, value) => {
    for (var i = 0; i < boxes.length; i++) {
        if (value.includes(boxes[i].value)) {
            boxes[i].checked = true;
        }
    }
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id)
    element.textContent = value;
}

// function createAndUpdateJSONFile() {
//     let methodURL = site_properties.json_host_server;
//     let methodCall = "POST";
//     if (isUpdate) {
//         methodCall = "PUT";
//         methodURL = methodURL + employeePayrollObj.id;
//     }
//     makePromiseCall(methodCall, methodURL, true, employeePayrollObj)
//         .then(responseText => {
//             console.log(employeePayrollObj);
//         }).catch(error => {
//             console.log(methodCall + " Error Staus: " + JSON.stringify(error));
//             resetForm();
//             window.location.replace(site_properties.home_page);
//         });
// }
function createServer() {
    
    let methodURL = site_properties.json_host_server+"register";
    let methodCall = "POST";
    if (isUpdate) {
        updateServer();
    }
    console.log(methodURL);
    console.log(methodCall);
    makePromiseCall(methodCall, methodURL, true, newData)
        .then(responseText => {
            console.log("in promisecall");
            console.log(responseText);
            window.location.replace(site_properties.home_page);
        }).catch(error => {
            console.log(methodCall + " Error Staus: " + JSON.stringify(error));
            // resetForm();
            // window.location.replace(site_properties.home_page);
        });
    
}

function updateServer() {
    
    let methodURL = site_properties.json_host_server +"register/"+dataEmp.data._id;
    let methodCall = "PUT";
    
    console.log(methodURL);
    console.log(methodCall);
    makePromiseCall(methodCall, methodURL, true, newData)
        .then(responseText => {
            console.log("in promisecall");
            console.log(responseText);
            window.location.replace(site_properties.home_page);
        }).catch(error => {
            console.log(methodCall + " Error Staus: " + JSON.stringify(error));
            // resetForm();
            // window.location.replace(site_properties.home_page);
        });
}

