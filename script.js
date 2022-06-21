
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
    var priceTotal = 0
    var ksPlants = Object.keys(price)
    console.log(quantity["GeumRivale"]["aerial"])
    for (var i=0; i<ksPlants.length; i++) {
        var plant = ksPlants[i]
        var ksParts = Object.keys(quantity[plant])
        for (var j=0; j<ksParts.length; j++) {
            var part = ksParts[j]
            var productsQuantity = quantity[plant][part]
            console.log(names[plant] + " (" + part + ")", productsQuantity)
            if (productsQuantity!=0) {
                var productName = names[plant] + " (" + part + ")"
                var productsPrice = price[plant][part]

                priceTotal += productsQuantity*productsPrice

                var p = document.createElement("p");
                var text = document.createTextNode(productName)
                p.appendChild(text)
                objName.appendChild(p)

                p = document.createElement("p")
                text = document.createTextNode(productsQuantity+" portions")
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
        transportation = ["self-pickup",""]
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