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
        console.log('this is response', response);
        let searchsnp = response.marketSummaryResponse.result[0];
        console.log("this is the search marketsummar", searchsnp);
        let snp = searchsnp.shortName;
        console.log("this is the name of exchange", snp);
        let SNPprice = searchsnp.regularMarketPrice.fmt;
        console.log("this is the price of the index", SNPprice);
        let SNPchange = searchsnp.regularMarketChangePercent.fmt;
        console.log('this is the daily change%', SNPchange);
        // Dow Jones Industrial Information 
        console.log('this is response Dow', response);
        let searchDow = response.marketSummaryResponse.result[1];
        console.log("this is the search marketsummar", searchDow);
        let dow = searchDow.shortName;
        console.log("this is the name of exchange", dow);
        let DOWprice = searchDow.regularMarketPrice.fmt;
        console.log("this is the price of the index", DOWprice);
        let Dowchange = searchDow.regularMarketChangePercent.fmt;
        console.log('this is the daily change%', Dowchange);
        //Nasdaq composite information 
        console.log('this is response Dow', response);
        let searchNasdaq = response.marketSummaryResponse.result[2];
        console.log("this is the search marketsummar", searchNasdaq);
        let nasdaq = searchNasdaq.shortName;
        console.log("this is the name of exchange", nasdaq);
        let NASprice = searchNasdaq.regularMarketPrice.fmt;
        console.log("this is the price of the index", NASprice);
        let Naschange = searchNasdaq.regularMarketChangePercent.fmt;
        console.log('this is the daily change%', Naschange);
    });




});

