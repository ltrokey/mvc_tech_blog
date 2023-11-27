const signUpFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPassword")
    .value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  if (username && password && confirmPassword) {
    try {
      const res = await fetch("/api/users/signUp", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User signed up successfully:", data);
        document.location.replace("/dashboard");
      } else {
        const errorMessage = await res.json();
        console.error("Sign-up failed:", errorMessage);
        alert(
          "Failed to sign up. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  }
};

document
  .querySelector(".signUpForm")
  .addEventListener("submit", signUpFormHandler);
