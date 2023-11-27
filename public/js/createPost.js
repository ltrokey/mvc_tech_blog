const createPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  if (!title || !content) {
    alert("Title and content cannot be empty!");
    return;
  }

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Post created successfully:", data);

      window.location.replace("/dashboard");
    } else {
      const errorMessage = await response.json();
      console.error("Failed to create post:", errorMessage);
      alert("Failed to create post. Please try again.");
    }
  } catch (error) {
    console.error("Error during post creation:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};
