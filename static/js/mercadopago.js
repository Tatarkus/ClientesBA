Mercadopago.setPublishableKey("TEST-8d6ca48f-89c2-4fa7-ac1c-19518a68a6ec");
function getBin() {
    var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
    return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
};
function guessingPaymentMethod(event) {
    var bin = getBin();
    if (event.type == "keyup") {
        if (bin.length >= 6) {
            Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethodInfo);
        }
    } else {
        setTimeout(function() {
            if (bin.length >= 6) {
                Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        }, 100);
    }
};
Mercadopago.getIdentificationTypes();
function setPaymentMethodInfo(status, response) {
    if (status == 200) {
        var form = document.querySelector('#pay');
        if (document.querySelector("input[name=paymentMethodId]") == null) {
            var paymentMethod = document.createElement('input');
            paymentMethod.setAttribute('name', "paymentMethodId");
            paymentMethod.setAttribute('type', "hidden");
            paymentMethod.setAttribute('value', response[0].id);
            form.appendChild(paymentMethod);
        } else {
            document.querySelector("input[name=paymentMethodId]").value = response[0].id;
        }
    }
};
function addEvent(el, eventName, handler) {
    if (el.addEventListener) {
        console.log("existe");
       el.addEventListener(eventName, handler);
    } else {
        console.log("no existe el");
        el.attachEvent('on' + eventName, function(){
          handler.call(el);
        });
    }
};
addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', guessingPaymentMethod);
console.log("doSubmit");
doSubmit = false;
addEvent(document.querySelector('#pay'),'submit',doPay);
function doPay(event){
    event.preventDefault();
    if(!doSubmit){
        var $form = document.querySelector('#pay');
        Mercadopago.createToken($form, sdkResponseHandler); // La funcion "sdkResponseHandler" se define a continnuacion
        return false;
    }
};
function sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        alert("Datos presentan erorres");
    }else{
        var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name',"token");
        card.setAttribute('type',"hidden");
        card.setAttribute('value',response.id);
        form.appendChild(card);
        response.montoPago = document.getElementById("montoPago").value
        console.log(response)
        console.log(document.getElementById("montoPago").value)
        json = JSON.stringify(response)
        doSubmit=true;
        $.post( "/pagar/pagar", {
             json: json 
        });
        //form.submit();
    }
};