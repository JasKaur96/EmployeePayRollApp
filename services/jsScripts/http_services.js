function makePromiseCall(methodType, url, async = true, data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(methodType + "- State Changed Called. Ready State: " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
            resolve(xhr.responseText);
            }
            else if (xhr.status >= 400) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed!");
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };
 
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            const empData = JSON.stringify(data)
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log("Sent The data",JSON.stringify(data));
            xhr.send(empData)
        } else xhr.send();
        console.log(methodType + " request Sent to the server");
    });
}