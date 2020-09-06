$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const addressInput = $("input#address-input");
  const artformInput = $("input#artform-input");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      artist_address: addressInput.val().trim(),
      artform: artformInput.val().trim()
    };
    //require the field to be filled during signup
    if (!userData.email || !userData.password || !userData.artist_address || !userData.artform) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.artist_address, userData.artform);
    emailInput.val("");
    passwordInput.val("");
    addressInput.val("");
    artformInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, artist_address, artform) {
    $.post("/api/signup", {
      email: email,
      password: password,
      artist_address: artist_address,
      artform: artform
    })
      .then(() => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
