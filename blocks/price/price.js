function loadPrice() {
    var request = new XMLHttpRequest();
    var url = 'https://api.jsonbin.io/b/5b683d097b212953678c03dd';
    request.open('GET', url);

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var response = JSON.parse(request.responseText);
            console.log(response);
        }
    }
}

document.addEventListener('DOMContentLoaded', loadPrice);
