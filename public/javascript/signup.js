const signupFormHandler = async function(event) {
    event.preventDefault();

    const unElem = document.querySelector("#un-input-signup");
    const pwElem = document.querySelector("#pw-input-signup");

    fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify({
            username: unElem.value,
            password: pwElem.value
        }),
        headers: { 'Content-Type': 'application/json'}
    })
        .then(function() {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};

// selectory and listeners

document.querySelector("signup-form").addEventListener("submit", signupFormHandler);