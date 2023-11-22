const loginFormHandler = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim()

    if (username && password) {
        const res = await fetch('/api/users/login', {
            // check this route?
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
            document.location.replace('/dashboard')
            // check this route
        } else {
            alert("Failed to log in")
        }
    }
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);