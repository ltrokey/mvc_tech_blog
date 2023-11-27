const deletePostHandler = async (postId) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      document.location.replace("/dashboard/");
    } else {
      const errorMessage = await response.json();
      console.error("Failed to delete post:", errorMessage);
    }
  } catch (error) {
    console.error("Error during post deletion:", error);
  }
};
