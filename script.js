let check1stCurrency="";
let Check2ndCurrency="";
let rate=0;
function convert(from, to, value) {
    const apiUrl = `https://latest.currency-api.pages.dev/v1/currencies/${from.toLowerCase()}.json`;

    // Convert the input value to a number
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
        document.getElementById("function-output").value = "Invalid amount.";
        return;
    }

    fetch(apiUrl)
        .then((resp) => {
            if (!resp.ok) throw new Error(`HTTP error! Status: ${resp.status}`);
            return resp.json();
        })
        .then((data) => {
            const fromCurrency = from.toLowerCase();
            const toCurrency = to.toLowerCase();
            
            // Check if the currencies exist in the response
            if (data[fromCurrency]?.[toCurrency]) {
                // global drclair rate variable
                 rate = Number(data[fromCurrency][toCurrency]);
                
                if (isNaN(rate)) {
                    document.getElementById("function-output").value = "Invalid rate data.";
                } else {
                    const convertedValue = (numericValue * rate).toFixed(2);
                    document.getElementById("function-output").value = convertedValue;
                }
            } else {
                document.getElementById("function-output").value = "Currency not found.";
            }
        })
        .catch(() => {
            document.getElementById("function-output").value = "Error fetching data.";
        });
}
function nameCurrency(){
  // Fetch currency data from the API
fetch('https://openexchangerates.org/api/currencies.json')
  .then(response => response.json())
  .then(data => {
    // Get references to both dropdowns
    const dropdown1 = document.getElementById('1stSelect');
    const dropdown2 = document.getElementById('2ndSelect');

    // Loop through the data and create options
    for (const [code, name] of Object.entries(data)) {
      // Create option element
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${code} `;

      // Append the option to both dropdowns
      dropdown1.appendChild(option.cloneNode(true)); // Clone the option for the second dropdown
      dropdown2.appendChild(option);
    }
  })
  .catch(error => alert.error('Error fetching data:', error));
  converting();
}
function converting(){
  const gotValue = document.getElementById('function-input').value ;
  var selected1stCurrency = document.getElementById("1stSelect").value;
  var selected2ndCurrency = document.getElementById("2ndSelect").value;
    if(selected1stCurrency===check1stCurrency && selected2ndCurrency===check2ndCurrency){
        let result = gotValue * rate;
        document.getElementById('function-output').value = result.toFixed(2);
        return ;
    }
  convert(selected1stCurrency,selected2ndCurrency,gotValue);
    check1stCurrency = selected1stCurrency ;
    check2ndCurrency = selected2ndCurrency ;
    
}
