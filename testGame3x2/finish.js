
let queryStr = window.location.search;  // ?param1=value1&param2=value2...

function getParams(query) {
    let params = {};
    query.split('&').forEach((param) => {
        let pv = param.split('=');
        params[pv[0]] = pv[1];
    });

    return params;
}

const params = getParams(queryStr.substring(1));
let scoreElement = document.getElementById('score');
scoreElement.textContent = params['score'];
