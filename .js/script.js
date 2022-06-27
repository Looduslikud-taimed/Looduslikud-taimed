
function add(obj,name) {
    obj.parentNode.querySelector('input[type=number]').stepUp()
    quantity[name[0]][name[1]] += 1
    localStorage.setItem('quantity',JSON.stringify(quantity))
}

function subtract(obj,name) {
    obj.parentNode.querySelector('input[type=number]').stepDown()
    quantity[name[0]][name[1]] -= 1
    localStorage.setItem('quantity',JSON.stringify(quantity))
}

function updateIncrementers() {
    /*Price*/
    var ksPlants = Object.keys(price)
    for (var i=0; i<ksPlants.length; i++) {
        var plant = price[ksPlants[i]]
        var ksParts = Object.keys(plant)
        for (var j=0; j<ksParts.length; j++) {
            var n = ksPlants[i]+"-price-"+ksParts[j]
            var obj = document.getElementById(n)
            obj.innerHTML = obj.innerHTML.replace("_", plant[ksParts[j]])
        }
    }
    /*Quantity*/
    var ksPlants = Object.keys(quantity)
    for (var i=0; i<ksPlants.length; i++) {
        var plant = quantity[ksPlants[i]]
        var ksParts = Object.keys(plant)
        for (var j=0; j<ksParts.length; j++) {
            var n = ksPlants[i]+"-incrementer-"+ksParts[j]
            document.getElementById(n).querySelector('input[type=number]').value = plant[ksParts[j]];
        }
    }
}

function updateCart() {
    var objName = document.getElementById("products-name")
    var objQuantity = document.getElementById("products-quantity")
    var objPrice = document.getElementById("products-price")
    var objTotal = document.getElementById("products-price-total")
    priceTotal = 0
    order = []
    var ksPlants = Object.keys(price)
    for (var i=0; i<ksPlants.length; i++) {
        var plant = ksPlants[i]
        var ksParts = Object.keys(quantity[plant])
        for (var j=0; j<ksParts.length; j++) {
            var part = ksParts[j]
            var productsQuantity = quantity[plant][part]
            if (productsQuantity!=0) {
                var productName = names[plant] + " (" + names[part] + ")"
                var productsPrice = price[plant][part]

                priceTotal += productsQuantity*productsPrice
                order.push([productName,productsQuantity,productsPrice])

                var p = document.createElement("p");
                var text = document.createTextNode(productName)
                p.appendChild(text)
                objName.appendChild(p)

                p = document.createElement("p")
                var lastDigit = productsQuantity % 10
                if (lastDigit ==1) {
                    var word = "порция"
                }
                else if (lastDigit==2 || lastDigit==3 || lastDigit==4) {
                    word = "порции"
                }
                else {
                    word = "порций"
                }
                text = document.createTextNode(productsQuantity+" "+word)
                p.appendChild(text)
                objQuantity.appendChild(p)

                p = document.createElement("p")
                text = document.createTextNode(productsPrice+" EUR")
                p.appendChild(text)
                objPrice.appendChild(p)
            }
        }
    }
    objTotal.appendChild(document.createTextNode(priceTotal+" EUR"))
}

function selectTransportationType(ind) {
    if (ind==0) {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        transportation = ["self-pickup",document.getElementById("self-pickup-text").innerHTML.slice(0,-8)]
    }
    else if (ind==1) {
        document.getElementById("dpd-pickup-point-select").style.display = "inline"
        document.getElementById("omniva-pickup-point-select").style.display = "none"
        var select = document.getElementById("dpd-pickup-point-select")
        transportation = ["DPD",select.options[select.selectedIndex].text]
    }
    else {
        document.getElementById("dpd-pickup-point-select").style.display = "none"
        document.getElementById("omniva-pickup-point-select").style.display = "inline"
        select = document.getElementById("omniva-pickup-point-select")
        transportation = ["Omniva",select.options[select.selectedIndex].text]
    }
}

function selectTransportationDestination(ind) {
    if (ind==1) {
        var select = document.getElementById("dpd-pickup-point-select")
        transportation = ["DPD",select.options[select.selectedIndex].text]
    }
    else {
        select = document.getElementById("omniva-pickup-point-select")
        transportation = ["Omniva",select.options[select.selectedIndex].text]
    }
}

function sendConfirmationCode() {
    var email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}

function checkConfirmationCode() {
    var email = document.getElementById("email-for-verification").value
    if (email.includes("@")) {
        document.getElementById("verification-code-block").style.display = "block"
        document.getElementById("verification-wrong-email").style.display = "none"
    }
    else {
        document.getElementById("verification-wrong-email").style.display = "inline"
    }
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
}



function r(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getOrderNumber() {
    return "" + r(0, 9) + r(0, 9) + r(0, 9) + r(0, 9) + r(0, 9) + r(0, 9)
}

function l0(t) {
    return ('0'+t).slice(-2)
}

function sendConfirmationEmail() {

    var name1 = document.getElementById("personal-data-name1").value 
    var name2 = document.getElementById("personal-data-name2").value
    var email = document.getElementById("personal-data-email").value
    var phoneNumber = document.getElementById("personal-data-phone").value
    var address = document.getElementById("personal-data-address").value
    var currentdate = new Date()
    var time = currentdate.getDate() + "."
                    + l0(currentdate.getMonth()+1)  + "." 
                    + currentdate.getFullYear() + " "  
                    + l0(currentdate.getHours()) + ":"  
                    + l0(currentdate.getMinutes())

    if (transportation==null || transportation[0]=="") {
        if (document.getElementById("self-pickup").checked) {
            transportation = ["self-pickup",document.getElementById("self-pickup-text").innerHTML.slice(0,-8)]
        }
    }

    let data = {
        name1:  name1,
        name2: name2,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        time: time,
        order: order,
        orderNumber: getOrderNumber(),
        orderSum: priceTotal,
        transport: [transportation[1],transportationPrice[transportation[0]]],
        language: language
    };

    var url = 'https://looduslikud-taimed.000webhostapp.com/order';
    var xhr = createCORSRequest('POST', url);
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState == 4 && xhr.status == 200)
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText)
            console.log(response[0])
            if (response[0]=="success") {
                orderReceipt = response[1]
                localStorage.setItem('orderReceipt',orderReceipt)
                window.location.replace("../order-done")
            }
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            orderError = response[0]
            localStorage.setItem('orderError',orderError)
        }
	}
    xhr.send(JSON.stringify(data))
}

function displayReceipt() {
    var receipt = localStorage.getItem('orderReceipt')
    document.getElementById("receipt").innerHTML = receipt
}

function displayError() {
    var error = localStorage.getItem('orderError')
    document.getElementById("error").innerHTML = error
}