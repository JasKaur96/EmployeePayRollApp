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
        // login();
        validate();
        // alert("Login Successful!");       
    }catch (exception) {
        console.error(exception);
        // alert("Invalid PhoneNo. or Password!");
        return;
    }
}
const createEmpData = (id) => {
    if (!id) loginObj.id = createNewEmployeeId();
    else loginObj.id = id;
    return loginObj;
}

function validate(){    
    loginObj.id = userId.value;
    loginObj.password = password.value;
    console.log(loginObj+"login object")
    try{
        login();
    }catch(exception){
        console.log(exception)
        return;
    }
}

function setUserTokenInLocalStorage(loginObj) {
    return localStorage.setItem("Token",loginObj)
};

function login() {
    let methodURL = site_properties.json_host_server +"login";
    let methodCall = "POST";
    // let loginObj = {  "id" : 9321444798,
    // "password": "Admin@1234"}

    makePromiseCall(methodCall, methodURL, true, loginObj)
        .then(responseText => {
            console.log(responseText);
            console.log(loginObj);
            console.log("Login Successful!");
            let userToken = JSON.parse(responseText)
            setUserTokenInLocalStorage(userToken.Token);
            console.log(userToken.Token);
            window.location.replace(site_properties.home_page);
        }).catch(error => {
            console.log(methodCall + " Error Staus: " + JSON.stringify(error));
            // resetForm();
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



