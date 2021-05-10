let userId = document.querySelector('#userId');
let password = document.querySelector('#password');
let userIdError;
let loginObj = {};

window.addEventListener("DOMContentLoaded", function(){
    console.log('Js File loaded here.');
    userId = document.querySelector('#userId');
    userIdError = document.querySelector('.userId-error');
    userId.addEventListener( 'input', function() {
        if (userId.value.length == 0) {
            userIdError.textContent = "*Phone No. field is empty!!";
            return;
        }
        try {
            phoneCheck(userId.value);
            userIdError.textContent="";
        } catch (exception) {
            userIdError.textContent = exception;
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
    
    return [userId,userIdError,password,passwordError]
})    


function phoneCheck(userId) {
    let userIdRegex = RegExp('^[0-9]{10}$')
    if (!userIdRegex.test(userId)) throw "PhoneNo. is Invalid!";
}

function passwordCheck(password) {
    let pswdRegex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$');
    if (!pswdRegex.test(password)) throw "Password is Invalid!";
}

function save() {
    try {
        validate();
        alert("Login Successful!");       
    }catch (exception) {
        console.error(exception);
        alert("Invalid PhoneNo. or Password!");
        return;
    }
}
const createEmpData = (id) => {
    if (!id) loginObj.id = createNewEmployeeId();
    else loginObj.id = id;
    return loginObj;
}

function validate(){    
    let id ;
    let userPassword ;
    loginObj.id = userId.value;
    loginObj.userPassword = password.value;
    console.log(loginObj+"login object")
    try{
        createAndUpdateJSONFile();
    }catch(exception){
        console.log(exception)
        return;
    }
}

function createAndUpdateJSONFile() {
    let methodURL = site_properties.json_host_server1;
    let methodCall = "POST";
    
    console.log("Login Successful!");
    makePromiseCall(methodCall, methodURL, true, loginObj)
        .then(responseText => {
            console.log(loginObj);
        }).catch(error => {
            console.log(methodCall + " Error Staus: " + JSON.stringify(error));
            resetForm();
            window.location.replace(site_properties.login_page);
        });
}

function toggle(){
    let pswd = document.getElementById("password");
    if (pswd.type == "password"){
        pswd.type = "text";
    }
    else{ pswd.type = "password";}
}





// function setEmployeePayrollObject() {
//     try {
//         loginObj._phone = document.getElementById('').value;
    
//         loginObj._password = getRadioValue(document.getElementsByName('profile'));
//         console.log(employeePayrollObj);
//     }
//     catch (exception) {
//         console.error(exception);
//     }
// }
// function validate(){
    
//     let id = userId.value;
//     let pswd = password.value;
//     console.log("Validate----- "+id+" "+pswd)
//     phone(id);
//     let userIdRegex = '^[0-9]{10}$';
//     let passwordRegex ='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$';
//     regPattern1 = new RegExp(userIdRegex);
//     result1 = regPattern1.test(id);
//     regPattern2 = new RegExp(passwordRegex);
//     result2 = regPattern2.test(pswd);
//     console.log(result1 +" "+ result2);

//     if(id != "" && pswd != ""){
//         console.log(id +" "+ pswd);
//         console.log(result1 +" "+ result2);
//         if(result1 == true && result2 == true){
//             alert("Login Successful!");
//             return true;   
//         }
//         else{
//             alert("Phone No. or Password is Invalid!");
//         }
//     }
//     else{
//         console.log(id +" "+ pswd);
//         alert("Enter Phone No. and Password!");
//     }

// }

// function phone(id){
// // const id = document.querySelector('#userId');
// // userIdError = document.querySelector('.userId-error');
// id.addEventListener( 'input', function() {
//     let userIdRegex = RegExp('^[0-9]{10}$');
//     if (userIdRegex.test(id.value)) {
//         userIdError.textContent="";
//     } else {
//         userIdError.textContent = "UserID is Incorrect";
//     }
// });
// }
// const password = document.querySelector('#password');
// const passwordError = document.querySelector('.password-error');
// password.addEventListener( 'input', function() {
//     let passwordRegex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$');
//     if (passwordRegex.test(password.value)) {
//         passwordError.textContent="";
//     } else { passwordError.textContent = "Password is Incorrect";
// }
// });
