
'use strict';
function http(options) {
    return new Promise(function(resolve, reject) {
        options.headers = {'Authorization': sessionStorage.getItem('token')};
        options.success = function(result) {
            if(result.message) alert(result.message);
            switch(result.status) { 
                case 200:
                    resolve(result.data);
                    break;
                case 199:
                case 500:
                    break;
                case 401:
                    window.location.href = '/login/index.html';
            }
        };
        $.ajax(options);
    });
}