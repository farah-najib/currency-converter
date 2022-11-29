const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");



const requestOptions = {
  method: 'GET',
 
};

fetch("http://localhost:3000/symbols", requestOptions)
  .then(response => response.json())
  .then((result) => {       

    JSON.stringify(result);
    let data = result.symbols;
    

    for (let i = 0; i < dropList.length; i++) {
        for(let currency_code in data){
            // selecting USD by default as FROM currency and SEK as TO currency
            let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "SEK" ? "selected" : "";
            // creating option tag with passing currency code as a text and value
            let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
            // inserting options tag inside select tag
            dropList[i].insertAdjacentHTML("beforeend", optionTag);
        }
    
    }
})
  .catch(error => console.log('error', error));


window.addEventListener("load", ()=>{
    getExchangeRate();
});
getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; 
    fromCurrency.value = toCurrency.value; 
    toCurrency.value = tempCode; 
    loadFlag(fromCurrency); 
    loadFlag(toCurrency); 
    getExchangeRate();
})
function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }"",
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `http://localhost:3000/currency?to=${toCurrency.value}&from=${fromCurrency.value}&amount=${amountVal}`;
    fetch(url, requestOptions).then(response => response.json()).then(result =>{
        
        let totalExRate = result.result; 
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ 
        exchangeRateTxt.innerText = "Something went wrong";
    });
}

