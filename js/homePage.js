let empPayrollList = new Array();

window.addEventListener("DOMContentLoaded", (event) => {
    
    if (site_properties.from_local) getEmpDataFromLocalStorage();
    // else getEmpDataFromJSONServer();
    else getEmpDataServer();
});

function getEmpDataFromLocalStorage() {
    empPayrollList = localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
        console.log(empPayrollList)
    processLocalStorageResponse()
};

// function getEmpDataFromJSONServer() {
//     let getURL = site_properties.json_host_server;
//     console.log(getURL)
//     makePromiseCall("GET", getURL, true)
//         .then(responseText => {
//             empPayrollList = (JSON.parse(responseText));
//             console.log(empPayrollList);
//             processLocalStorageResponse()
//         }).catch(error => {
//             console.log("GET Error Staus: " + JSON.stringify(error));
//         });
// }

function getEmpDataServer(){
    let getURL = site_properties.json_host_server+"register";
    console.log(getURL);
    makePromiseCall("GET",getURL, true).then(responseText => {
        empPayrollList = responseText;
        processLocalStorageResponse(empPayrollList)
    })
    .catch(error => {
        // if(error !== undefined)
            console.log("GET Error Staus: " + error);
    });
}

function processLocalStorageResponse(data) {
    console.log("Inside processlocal",JSON.parse(data));
    const empdata= JSON.parse(data);

    document.querySelector(".emp-count").textContent = empdata.data.length;
    // if(data){
        createInnerHTML(empdata.data);
    // }
   
    localStorage.removeItem("editEmp");
}

function createInnerHTML(data) {
    console.log(data);

    const headerHTML =
        "<th></th>" +
        "<th>Emp Name</th>" +
        "<th>Gender</th>" +
        "<th>Department</th>" +
        "<th>PhoneNo.</th>" +
        "<th>Salary</th>" +
        "<th>Start Date</th>" +
        "<th>Actions</th>";

    if (data.length == 0) {
        console.log(data);
        console.log("No data found");
        return;
    }
    let innerHTML = `${headerHTML}`;
    for (const empData of data) {
        innerHTML = `${innerHTML}
        <tr>
            <td><img class="profile" src="${empData._profile_image}" alt="Profile Pic"></td>
            <td>${empData._name}</td>
            <td>${empData._gender}</td>
             <td>${getDeptHTML(empData._department)}</td>
             <td>${empData._phoneNo}</td>
            <td>RS ${empData._salary}</td>
            <td>${stringifyDate(empData._startDate)}</td>
            <td>
                <img id="${empData._id}" onclick="remove(this)" alt="delete" src="../Assets/icons/delete-black-18dp.svg">
                <img id="${empData._id}" onclick="update(this)" alt="edit" src="../Assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHTML;
}

function getDeptHTML(deptList) {
    console.log(typeof(deptList))
    console.log(deptList)
    let deptHTML = '';
    let department = JSON.stringify(deptList);
    // console.log(typeof(department))
    // for (const dept of department) {
        deptHTML = `${deptHTML}<div class="dept-label">${deptList}</div>`
    // }
    return deptHTML;
}

function remove(node) {
    // let empPayrollData = empPayrollList.find(empData => empData.id == node.id);

    // if (!empPayrollData) {
    //     console.log("No entry found!!");
    //     return; 
    // }
    // const index = empPayrollList.map(empData => empData.id)
    //     .indexOf(empPayrollData.id);
    // empPayrollList.splice(index, 1);

    if (site_properties.from_local) {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent = empPayrollList.length;
        createInnerHTML();
    } else {
        let delURL = site_properties.json_host_server +"register/"+ node.id;
        console.log(delURL)
        makePromiseCall("DELETE", delURL, false)
            .then(responseText => {
                console.log("Del: " + node);
                document.querySelector(".emp-count").textContent = node.length;
                createInnerHTML();
                window.location.replace(site_properties.home_page);
            }).catch(error => {
                console.log("DEL Error Status: " + JSON.stringify(error));
            });
            window.location.replace(site_properties.home_page);
    }
}

function update(node) {
    console.log("NOde in update",node.id)
    let emp;
    
    let getURL = site_properties.json_host_server+"register/"+node.id;
    console.log(getURL);
    makePromiseCall("GET",getURL, true).then(responseText => {
       empPayrollList = responseText;
       console.log("Data is here",empPayrollList)
       emp=empPayrollList
       localStorage.setItem('editEmp', JSON.stringify(responseText, '\t', 2));
    })
    .catch(error => {
       console.log("GET Error Staus: " + error);
    });
    window.location.replace(site_properties.add_emp_payroll_page);
}