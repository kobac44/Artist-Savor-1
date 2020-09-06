$(document).ready(() => {
  let userId;
  let artForms;
  //get user data and add it to the DOM
  function userDat() {
    $.get("/api/user_data").then(data => {
      userId = data.id;
      artForms = data.artform;
      $(".member-name").text(data.email);
      $(".artist-address").text(data.artist_address);
      $(".art-form").text(artForms);
      $(".user-id").text(userId);
    });
  };
  userDat();
  // take the info from DOM to variable
  let UserId = $(".user-id");

  let originMoney = $("input#originMoney");

  let artType = $("input#artType");

  let artAmount = $("input#artAmount");
  let payBtn = $("#payBtn");
  //button click handler for submitting an artist pay transaction 
  payBtn.on("click", PaySubmit);
  function PaySubmit(event) {
    event.preventDefault();
    //load data from form into gigPay to post later
    let gigPay = {
      origin: originMoney.val().trim(),
      type: artType.val().trim(),
      amount: artAmount.val().trim(),
      UserId: UserId.text()
    };
    sendPay(gigPay);
    //clear form for artist pay
    originMoney.val('');
    artType.val('');
    artAmount.val('');
  };
  //post pay to db and reload the current view with new info
  function sendPay(Pay) {
    $.post('/api/pays', Pay, function () {
      window.location.reload();
    });
  };
  // take the info from DOM to variable
  let UserId2 = $(".user-id");
  let originCost = $("input#originCost");
  let costType = $("input#costType");
  let artCost = $("input#artCost");
  let costBtn = $("#costBtn");
  //button click handler for submitting an artist cost transaction 
  costBtn.on("click", CostSubmit);
  function CostSubmit(event) {
    event.preventDefault();
    //load data from form into gigCost to post later
    let gigCost = {
      origin: originCost.val().trim(),
      type: costType.val().trim(),
      cost: artCost.val().trim(),
      UserId: UserId2.text()
    };
    sendCost(gigCost);
    //clear cost form 
    originCost.val('');
    costType.val('');
    artCost.val('');
  };
  //function to send cost to api and reload current page with information
  function sendCost(Cost) {
    $.post('/api/costs', Cost, function () {
      window.location.reload();
    });
  };
  //function call by on click button event tracks this attribute per transaction line of artist cost
  function handleCostLineDelete() {
    let currentCost = $(this).attr("data-costid")
    deleteCurrCostLine(currentCost);
    window.location.reload();
  }
  //function call by on click button event tracks this attribute per transaction line of artist pay
  function handlePayLineDelete() {
    let currentPay = $(this).attr("data-payid")
    deleteCurrPayLine(currentPay);
    window.location.reload();
  }
  //api call to delete the transaction from the db and view
  function deleteCurrCostLine(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/cost/" + id
    })
      .then(function () {
      });
  }
  //api call to delete the transaction from the db and view
  function deleteCurrPayLine(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/pay/" + id
    })
      .then(function () {
      });
  }
  //variable of button classes
  deleteCurrCostLineBtn = $(".deleteCost");
  deleteCurrPayLineBtn = $(".deletePay");
  //on click event listeners
  deleteCurrCostLineBtn.on("click", handleCostLineDelete);
  deleteCurrPayLineBtn.on("click", handlePayLineDelete);
});
