import React, { useState, useEffect } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/posts") // ✅ Ensure backend is running
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="feed" style={{ maxWidth: "600px", margin: "auto", padding: "10px" }}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="post"
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "15px",
              marginBottom: "15px",
            }}
          >
            {/* 🔹 Profile Section */}
            <div className="post-header d-flex align-items-center" style={{ padding: "10px" }}>
              <img
                src={post.profilePic || "/assets/default-profile.jpg"} // ✅ Fixed Image Path
                alt="Profile"
                className="profile-pic rounded-circle"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                }}
              />
              <span
                className="username"
                style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}
              >
                {post.username}
              </span>
            </div>

            {/* 🔹 Post Image */}
            <img
              src={post.image}
              alt="Post"
              className="post-img"
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover",
                maxHeight: "500px",
              }}
            />

            {/* 🔹 Post Footer */}
            <div className="post-footer" style={{ padding: "10px" }}>
              <p style={{ fontSize: "14px" }}>
                <strong>{post.username}</strong> {post.caption}
              </p>

              {/* 🔹 Like, Comment, Share, Save Icons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  fontSize: "18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <span style={{ cursor: "pointer", fontSize: "18px" }}>❤️ {post.likes}</span>
                  <span style={{ cursor: "pointer", fontSize: "18px" }}>
                    <i className="bi bi-chat"></i> {post.comments?.length || 0}
                  </span>
                  <span style={{ cursor: "pointer", fontSize: "18px" }}>
                    <i className="bi bi-send"></i>
                  </span>
                </div>
                <span style={{ cursor: "pointer", fontSize: "18px" }}>
                  <i className="bi bi-bookmark"></i>
                </span>
              </div>

              {/* 🔹 Comments Section */}
              {post.comments?.length > 0 && (
                <div
                  className="comments"
                  style={{
                    marginTop: "10px",
                    background: "#f5f5f5",
                    padding: "5px",
                    borderRadius: "5px",
                    maxHeight: "100px", // ✅ Prevents long comments from breaking layout
                    overflowY: "auto", // ✅ Enables scrolling for long comments
                  }}
                >
                  {post.comments.map((comment, index) => (
                    <p key={index} style={{ fontSize: "13px", marginBottom: "5px" }}>
                      <strong>{comment.user}</strong>: {comment.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", fontSize: "16px" }}>Loading posts...</p>
      )}
    </div>
  );
}

export default Posts;
