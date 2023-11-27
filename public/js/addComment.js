const addCommentHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector("#commentText").value.trim();
  const post_id = document.querySelector("input[name='post_id']").value;

  if (!commentText) {
    alert("Comment cannot be empty!");
    return;
  }

  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Comment added successfully:", data);
      window.location.reload();
    } else {
      const errorMessage = await response.json();
      console.error("Failed to create comment:", errorMessage);
      alert("Failed to create comment. Please try again.");
    }
  } catch (error) {
    console.error("Error during comment creation:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};
