

$(document).ready(function () {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "acd626c871msh56e79dd581cd845p1e0ed3jsndbc38000616c"
        }
    }

    $.ajax(settings).done(function (response) {
        // the S&P 500 Daily information
        let searchsnp = response.marketSummaryResponse.result[0];
        let snp = searchsnp.shortName;
        let SNPprice = searchsnp.regularMarketPrice.fmt;
        let SNPchange = searchsnp.regularMarketChangePercent.fmt;
        let SNPDATA = `Regular Market Price today:
        $ ${SNPprice} 
         Regular Market Change Percent today:
        ${SNPchange}`;
        $('[data-toggle="SNPpopover"]').popover({ title: snp, content: SNPDATA });



        // Dow Jones Industrial Information 

        let searchDow = response.marketSummaryResponse.result[1];
        let dow = searchDow.shortName;
        let DOWprice = searchDow.regularMarketPrice.fmt;
        let DOWchange = searchDow.regularMarketChangePercent.fmt;
        let DOWDATA = `Regular Market Price today:
        $ ${DOWprice} 
        Regular Market Change Percent today:
        ${DOWchange}`;
        $(`[data-toggle="DOWpopover"]`).popover({ title: dow, content: DOWDATA });



        //Nasdaq composite information 

        let searchNasdaq = response.marketSummaryResponse.result[2];
        let nasdaq = searchNasdaq.shortName;
        let NASprice = searchNasdaq.regularMarketPrice.fmt;
        let NASchange = searchNasdaq.regularMarketChangePercent.fmt;
        let NASDATA = `Regular Market Price today:
        $ ${NASprice} 
        Regular Market Change Percent today:
        ${NASchange}`;
        $(`[data-toggle="NASpopover"]`).popover({ title: nasdaq, content: NASDATA });
    });


    let symbolBtn = $("#symbolBtn");
    //button click handler for submitting an artist query for a investment quote
    symbolBtn.on("click", symbolSubmit);
    function symbolSubmit(event) {
        event.preventDefault();
        symbol = $('#symbol').val().trim();
        let query = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=" + symbol + "%252CKC%253DF%252C002210.KS%252CIWM%252CAMECX",
            settings = {
                "async": true,
                "crossDomain": true,
                "url": query,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                    "x-rapidapi-key": "acd626c871msh56e79dd581cd845p1e0ed3jsndbc38000616c"
                }
            }

        $.ajax(settings).done(function (SYMBresponse) {

            let quoted = SYMBresponse.quoteResponse.result[0].regularMarketPrice;
            quoteOut = `Regular Market Price: $ ${quoted.toFixed(2)}`;
            document.getElementById("quote").value = quoteOut;

        });
    };
});

