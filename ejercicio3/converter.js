class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

class CurrencyConverter {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.currencies = [];
    }

    async getCurrencies(apiUrl) {
        try {
            const response = await fetch(`${this.apiUrl}/currencies`);
            const data = await response.json();
            this.currencies = Object.entries(data).map(
                ([code, name]) => new Currency(code, name)
            );
        } catch (error) {
            console.error('Error fetching currencies:', error);
        } finally {
            console.log("Petición GET completada");
        }
    }

    async convertCurrency(amount, fromCurrency, toCurrency) {
        if (fromCurrency.code === toCurrency.code) {
            return parseFloat(amount); // nos aseguramos que siempre sea un float
        }

        try {
            const response = await fetch(
                `${this.apiUrl}/latest?amount=${amount}&from=${fromCurrency.code}&to=${toCurrency.code}`
            );
            const data = await response.json();
            return parseFloat(data.rates[toCurrency.code]); // nos aseguramos que siempre sea un float
        } catch (error) {
            console.error('Error converting currency:', error);
            return null;
        } finally {
            console.log("Petición POST completada");
        }
    }

    //https://api.frankfurter.app/1999-01-04?amount=10000&from=USD&to=ZAR
    // entendemos que el formato de la fecha es YYYY-MM-DD
    async convertHistorical(date, amount, fromCurrency, toCurrency){
        if (fromCurrency.code === toCurrency.code) {
            return parseFloat(amount); // nos aseguramos que siempre sea un float
        }
        try {
            const response = await fetch(
                `${this.apiUrl}/${date}?amount=${amount}&from=${fromCurrency.code}&to=${toCurrency.code}`
            );
            const data = await response.json();
            return parseFloat(data.rates[toCurrency.code]);

        } catch (error) {
            console.error('Error converting currency:', error);
            return null;

        } finally {
            console.log("Petición POST historical completada");
        }

    }
}


document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("conversion-form");
    const resultDiv = document.getElementById("result");
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");
    // agregado
    const resultDiv2 = document.getElementById("result2");

    const converter = new CurrencyConverter("https://api.frankfurter.app");

    await converter.getCurrencies();
    populateCurrencies(fromCurrencySelect, converter.currencies);
    populateCurrencies(toCurrencySelect, converter.currencies);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const fromCurrency = converter.currencies.find(
            (currency) => currency.code === fromCurrencySelect.value
        );
        const toCurrency = converter.currencies.find(
            (currency) => currency.code === toCurrencySelect.value
        );

        const convertedAmount = await converter.convertCurrency(
            amount,
            fromCurrency,
            toCurrency
        );

        if (convertedAmount !== null && !isNaN(convertedAmount)) {
            resultDiv.textContent = `${amount} ${fromCurrency.code
                } son ${convertedAmount.toFixed(2)} ${toCurrency.code}`;
        } else {
            resultDiv.textContent = "Error al realizar la conversión.";
        }

        // agregado
        //https://api.frankfurter.app/1999-01-04?amount=10000&from=USD&to=ZAR
        const today = new Date(); //hoy
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1); //ayer
        

        // Podria ahorrame esta pediticion dado que ya tengo los datos en convertedAmount.
        const converterToday = await converter.convertHistorical(
            formatoDate(today), 
            amount, 
            fromCurrency, 
            toCurrency);

        const converterYesterday = await converter.convertHistorical(
            formatoDate(yesterday), 
            amount, 
            fromCurrency, 
            toCurrency);

        if (converterToday === null || converterYesterday === null || isNaN(converterToday) || isNaN(converterYesterday)) {
            resultDiv2.textContent = "Error al realizar la conversión.";
            console.log("Error al realizar la conversión.");

        } else{
            const difference = parseFloat(converterToday - converterYesterday);
            resultDiv2.innerHTML = `
            <p> (${formatoDate(today)}) - Hoy  ${amount} ${fromCurrency.code} son equivalente a ${converterToday.toFixed(2)} ${toCurrency.code}.</p> 
            <p>(${formatoDate(yesterday)}) - Ayer ${amount} ${fromCurrency.code} eran equivalente a ${converterYesterday.toFixed(2)} ${toCurrency.code}.</p> 
            <p>Diferencia de conversión: ${difference.toFixed(2)}</p>`;
        }


    });

    function populateCurrencies(selectElement, currencies) {
        if (currencies) {
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency.code;
                option.textContent = `${currency.code} - ${currency.name}`;
                selectElement.appendChild(option);
            });
        }
    }

    // agregado
    function formatoDate(date){
        // console.log(date);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }
});
