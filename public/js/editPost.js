const editPostFormHandler = async (event) => {
  event.preventDefault();

  // Extract post ID from the URL
  const postId = window.location.pathname.split("/")[2];
  console.log("postID", postId);

  // Retrieve other form data
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  console.log("title", title);
  console.log("content", content);

  // Validate form data
  if (!title || !content) {
    alert("Title and content cannot be empty!");
    return;
  }

  try {
    // Perform the fetch request
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Post updated successfully:", data);
      window.location.replace("/dashboard");
    } else {
      const errorMessage = await response.json();
      console.error("Failed to update post:", errorMessage);
      alert("Failed to update post. Please try again.");
    }
  } catch (error) {
    console.error("Error during post update:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};

document
  .querySelector(".editPost")
  .addEventListener("submit", editPostFormHandler);
