var currencyresult = null;



        function changecurrencyfrom() {
            var result = $("#input_currency").val();
            $.getJSON('http://api.exchangeratesapi.io/v1/latest?access_key=0c91f29acc0497e4315862c203694d92&base=' + result, function (jd) {
                currencyresult = jd;
                var rates = currencyresult['rates'];

                var ratesarry = Object.keys(rates);
                for (var i = 0; i < ratesarry.length; i++) {
                    $("#output_currency").append('<option value="' + ratesarry[i] + '">' + ratesarry[i] + '</option>');
                }


            });

        }

        changecurrencyfrom();

        function calculatecurrencyfrom() {
            var selectedchange = currencyresult['rates'][$("#output_currency").val()]
            let lastoutput = selectedchange * $("#ca").val();
           

            var textNode1 = document.createTextNode( $("#ca").val() + $("#input_currency").val() +"=");
            var textNode = document.createTextNode(lastoutput.toFixed(3) + $("#output_currency").val());

      
            document.body.appendChild(textNode1);
            document.body.appendChild(textNode);
        };


        const exchange = document.querySelector('#exchange');exchange.addEventListener('click', ()=>{
            const temp = input_currency.value;
            input_currency.value = output_currency.value;
            output_currency.value= temp;
            
        });