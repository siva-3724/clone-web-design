import React, { useState, useEffect } from "react";
import axios from "axios";

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/stories");
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div
      className="stories-container"
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {loading ? (
        <p>Loading stories...</p>
      ) : stories.length === 0 ? (
        <p>No stories available</p>
      ) : (
        stories.map((story) => (
          <div key={story.id} className="story" style={{ textAlign: "center" }}>
            <img
              src={story.profilePic || "/assets/default-profile.jpg"}
              alt={story.username}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #f05a5a",
              }}
            />
            <p style={{ fontSize: "12px", marginTop: "5px", whiteSpace: "nowrap" }}>
              {story.username}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Stories;
