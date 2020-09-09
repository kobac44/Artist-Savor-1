

$(document).ready(function () {
    // api for stock market price current var was required  with the api yahoo finance




    //let api_key = process.env.API_KEY;
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    //         "x-rapidapi-key": "acd626c871msh56e79dd581cd845p1e0ed3jsndbc38000616c",

    //     }
    // }
    // ajax call to pull in the current market price of SnP, Dow, Nasdaq 
    $.ajax('/api/yahoo').done(function (response) {
        // the S&P 500 Daily information
        let searchsnp = response.marketSummaryResponse.result[0];
        let snp = searchsnp.shortName;
        let SNPprice = searchsnp.regularMarketPrice.fmt;
        let SNPchange = searchsnp.regularMarketChangePercent.fmt;
        // response data for s and p sent to DOM popover
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
        // response data for the dow sent to DOM popover
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
        // response data for the nasdaq sent to DOM popover
        let NASDATA = `Regular Market Price today:
        $ ${NASprice} 
        Regular Market Change Percent today:
        ${NASchange}`;
        $(`[data-toggle="NASpopover"]`).popover({ title: nasdaq, content: NASDATA });
    });

    // stock market quote submit symbol function 
    let symbolBtn = $("#symbolBtn");
    //button click handler for submitting an artist query for a investment quote
    symbolBtn.on("click", symbolSubmit);
    function symbolSubmit(event) {
        event.preventDefault();
        symbol = $('#symbol').val().trim();

        // ajax call from yahoo finance api for stock symbol current market price useing AXIOS from api-routes
        $.ajax('api/yahoo/' + symbol).done(function (SYMBresponse) {
            console.log(SYMBresponse);
            // load the DOM with market price returned 
            let quoted = SYMBresponse.quoteResponse.result[0].regularMarketPrice;
            quoteOut = `Market Price: $ ${quoted.toFixed(2)}`;
            document.getElementById("quote").value = quoteOut;

        });
    };
    // button to clear stock symbol and market price so user may check another symbol
    let clearBtn = $('#clearBtn');
    clearBtn.on("click", clearSubmit);
    function clearSubmit(event) {
        event.preventDefault();
        $('#symbol').val("");
        $('#quote').val("");

    };
});

