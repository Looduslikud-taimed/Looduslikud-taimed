
var quantity = {
    GeumRivale: {
        aerial: 0,
        root: 0
    }, 
    AlchemillaVulgaris: {
        aerial: 0,
    },
    VeronicaChamaedrys: {
        aerial: 0,
    }, 
}

var transportation = ["",""]
var transportationPrice = {
    "self-pickup": 0,
    DPD: 3,
    Omniva: 3.50
}

var price = {
    GeumRivale: {
        aerial: 2,
        root: 4
    }, 
    AlchemillaVulgaris: {
        aerial: 2,
    },
    VeronicaChamaedrys: {
        aerial: 2,
    }, 
}

var priceTotal = 0
var order = []

var names = {
    GeumRivale: "Geum rivale", 
    AlchemillaVulgaris: "Alchemilla vulgaris",
    VeronicaChamaedrys: "Veronica chamaedrys", 
    root: "корень",
    aerial: "листья"
}

if (localStorage.getItem('quantity')!=null && localStorage.getItem('quantity')!=undefined) {
    quantity = JSON.parse(localStorage.getItem('quantity'))
    transportation = JSON.parse(localStorage.getItem('transportation'))
}
