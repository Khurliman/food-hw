const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}

// Создаём доп продукцию

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
      checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
      addCart = document.querySelector('.addCart'),
      receipt = document.querySelector('.receipt'),
      receiptOut = document.querySelector('.receipt__window-out'),
      receiptWindow = document.querySelector('.receipt__window'),
      receiptBtn = document.querySelector('.receipt__window-btn');

/* 

Перебираем все кнопки (+ и -)

*/

for(let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function() {
        plusOrMinus(this);
    })
}
// Функция обработки кнопки + или -
function plusOrMinus(element) {
    // console.log(element);

    // closest() - подключается к ближайшему заданному родителю
    // getAttribute() - берёт атрибут у элемента
    let parentId = element.closest('.main__product').getAttribute('id'),
        out = element.closest('.main__product').querySelector('.main__product-num'),
        price = element.closest('.main__product').querySelector('.main__product-price span'),
        kcall = element.closest('.main__product').querySelector('.main__product-call span');

    if(element.getAttribute('data-symbol') == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for(let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    const parent = el.closest('.main__product'),
          parentId = parent.getAttribute('id');

    product[parentId][el.getAttribute('data-extra')] = el.checked;
    
    const kcall = parent.querySelector('.main__product-call span'),
          price = parent.querySelector('.main__product-price span'),
          elDataInfo = el.getAttribute('data-extra');

    if(product[parentId][elDataInfo] == true) {
        product[parentId].kcall += extraProduct[elDataInfo].kcall;
        product[parentId].price += extraProduct[elDataInfo].price;
    }else {
        product[parentId].kcall -= extraProduct[elDataInfo].kcall;
        product[parentId].price -= extraProduct[elDataInfo].price;
    }
    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;
}

let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function() {
    for(const key in product) {
        const productObj = product[key];
        if(productObj.amount > 0) {
            arrProduct.push(productObj);
            for(const newKey in productObj) {
                if(productObj[newKey] === true) {
                    productObj.name += '\n' + extraProduct[newKey].name;
                }
            }
        }
        productObj.price = productObj.Summ;
        productObj.kcall = productObj.Kcall;
    }
    for(let i = 0; i < arrProduct.length; i++) {
        const el = arrProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += '\n' + el.name + '\n';
    }
    receiptOut.innerHTML = `Вы купили: \n ${totalName} \nКалорийность ${totalKcall} \nСтоимость покупки ${totalPrice} сум`;

    receipt.style.display = 'flex';
    setTimeout(function() {
        receipt.style.opacity = '1';
    }, 100);
    setTimeout(function() {
        receiptWindow.style.top = '0';
    }, 200);
    document.body.style.overflow = 'hidden';
    const outNum = document.querySelectorAll('.main__product-num'),
          outPrice = document.querySelectorAll('.main__product-price span'),
          outKcall = document.querySelectorAll('.main__product-call span');
    for(let i = 0; i < outNum.length; i++) {
        outNum[i].innerHTML = 0;
        outPrice[i].innerHTML = 0;
        outKcall[i].innerHTML = 0;
    }
})

receiptBtn.addEventListener('click', function() {
    location.reload();
})



/* *********************************************************** */
const timerExtra = document.querySelector('.header__timer-extra'),
      timer = document.querySelector('.header__timer'),
      timerText = document.querySelector('.header__timer-text');

let i = 1;
function level() {
    if(i < 80) {
        timerExtra.innerHTML = i;
        i++;  
        setTimeout(() => level(), 10);
    }else if(i < 101) {
        timerExtra.innerHTML = i;
        i++;  
        setTimeout(() => level(), 100);
    }
    if(i == 100) {
        timer.classList.add('lvl');
    }
}
level();

