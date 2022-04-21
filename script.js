// Async function which gets all avaliable currencies from the given API
async function list(){
    const response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    const countries = await response.json()

    document.querySelector("#from_currency").innerHTML = `
            <option>eur</option>
            ${Object.keys(countries).map((country) => {
        return `<option>${country}</option>`
    }).join('')}  
    `
    document.querySelector("#to_currency").innerHTML = `
            <option>inr</option>
            ${Object.keys(countries).map((country) => {
        return `<option>${country}</option>`
    }).join('')}  
    `
}
list()

// Async function which gets exchange rate between the select currencies
async function change(currency){
	let from = document.querySelector("#from_currency").value
	let to = document.querySelector("#to_currency").value
	let fromAmount = document.querySelector("#from_amount").value

	if(from!="Select" && to!="Select"){
		var currencyConvertions = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`, {method: 'GET'})
		var convertions = await currencyConvertions.json()
		document.querySelector("#rate").innerHTML = `
			<p>1 ${from} = ${convertions[to]} ${to}</p>
		`
		document.querySelector("#to_amount").value=fromAmount*convertions[to]
	}
}

// Async function which gets exchange rate between the select currencies
async function reverse(currency){
	let from = document.querySelector("#from_currency").value
	let to = document.querySelector("#to_currency").value
	let toAmount = document.querySelector("#to_amount").value

	if(from!="Select" && to!="Select"){
		var currencyConvertions = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${to}/${from}.json`, {method: 'GET'})
		var convertions = await currencyConvertions.json()
		document.querySelector("#rate").innerHTML = `
			<p>1 ${to} = ${convertions[from]} ${from}</p>
		`
		document.querySelector("#from_amount").value=toAmount*convertions[from]
	}
}