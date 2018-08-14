function getXhrObject() {
    if (typeof XMLHttpRequest === 'undefined') {
        XMLHttpRequest = function () {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        };
    }
    return new XMLHttpRequest();
}

function loadPrice() {
    var xhr = getXhrObject();
    var dest = document.querySelector('.price');
    xhr.open('GET', 'https://api.jsonbin.io/b/5b683d097b212953678c03dd');
    xhr.onload = function () {
        document.querySelector('.price__load').className += ' loaded';
        if (xhr.readyState == 4 && xhr.status === 200) {
            var prices = JSON.parse(xhr.responseText);
            for (var i = 0; i < prices.length; i++) {
                var item = document.createElement('div');
                item.className = 'price__item';
                item.innerHTML = '<div class="price__item_cpu" data-head="Процессор">' + prices[i]['cpu'] + '</div><div class="price__item_hdd" data-head="Жесткий диск">' + prices[i]['hdd'] + ' Гб</div><div class="price__item_ram" data-head="Память">' + prices[i]['ram'] + ' Гб </div><div class="price__item_price" data-head="Цена">' + prices[i]['price'] + ' ₽/мес.</div><div class="price__item_button"><a class="base__button" href="https://selectel.ru/" target="_blank">Заказать</a></div>'
                dest.appendChild(item);
            }
        } else {
            var err = document.createElement('div');
            err.className = 'price__error';
            err.innerHTML = 'Ошибка соединения.  Вернулся статус ' + xhr.statusж
            dest.appendChild(err);
        }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', loadPrice);
