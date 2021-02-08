const loginFormHandler = async function (event) {
    event.preventDefault();

    const unEl = document.querySelector("#un-input-login");
    const pwEl = document.querySelector("#pw-input-login");

    fetch("/api/user/login", {
        method: 'POST',
        body: json.stringify({
            username: unEl.value,
            password: pwEl.value
        }),
        headers: { 'Content-Type': 'application/json'}
    })
        .then(function () {
            document.location.replace("/dashboard");
        })
        .catch(err => console.error(err));
};

// listener and query selector

document.querySelector("#login-form").addEventListener("sumbit", loginFormHandler);