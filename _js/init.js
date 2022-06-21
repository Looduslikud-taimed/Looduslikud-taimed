
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

var names = {
    GeumRivale: "Geum rivale", 
    AlchemillaVulgaris: "Alchemilla vulgaris",
    VeronicaChamaedrys: "Veronica chamaedrys", 
}

if (localStorage.getItem('quantity')!=null && localStorage.getItem('quantity')!=undefined) {
    quantity = JSON.parse(localStorage.getItem('quantity'))
    transportation = JSON.parse(localStorage.getItem('transportation'))
}
