
$(document).ready(() => {
    // variable of id for pie chart view
    let ctx = $("#pieChart");
    //data set for the pie chart to animate
    artistDataArr = [];
    //function to load and render pie chart
    const allArtistTots = function () {
        $.get("/api/user_data").then(function (data) {
            email = data.email;
            $.get("/api/pay/total/" + email).then(function (payTotal) {
                artistDataArr.push(payTotal[0].tot_amt);
                //get total cost 
                $.get("/api/cost/total/" + email).then(function (costTotal) {
                    // push array of total cost
                    artistDataArr.push(costTotal[0].tot_amt);
                    // new instantiation of chart(pie)
                    new Chart(ctx, {
                        type: "pie",
                        data: {
                            labels: ["Artist Savor", "Artist Cost"],
                            datasets: [{
                                data: artistDataArr,
                                backgroundColor: [
                                    "#2ecc71",
                                    "#3498db"],
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Artist Savor vs. Artist Cost'
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            animation: {
                                duration: 4000,
                            }
                        }
                    });
                    // loading view with the collected data set from pay and cost
                    $("#artistTotal").text(artistDataArr[0] - artistDataArr[1]);
                });
            });
        });
    }
    //call function for pie chart instantiation
    allArtistTots();

});