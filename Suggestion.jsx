import React, { useState, useEffect } from "react";
import axios from "axios";

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/suggestions");
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchProfile();
    fetchSuggestions();
  }, []);

  return (
    <div
      style={{
        width: "280px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      {/* Profile Section */}
      {loadingProfile ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div
          className="d-flex align-items-center mb-3"
          style={{ gap: "12px" }}
        >
          {/* Profile Image */}
          <img
            className="rounded-circle"
            src={profile.profilePic || "/assets/default-profile.jpg"}
            alt="Profile"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />

          {/* Username & Full Name */}
          <div style={{ flex: 1, minWidth: "0" }}>
            <h6
              className="mb-1"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {profile.user?.username || "_sivaprasanth_p"}
            </h6>
            <p
              style={{
                fontSize: "12px",
                color: "#888",
                marginBottom: "0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {profile.user?.fullName || "sivaprasanth"}
            </p>
          </div>

          {/* "Switch" Text */}
          <p
            className="text-primary fw-bold mb-0"
            style={{
              cursor: "pointer",
              fontSize: "12px",
              minWidth: "50px",
              textAlign: "right",
            }}
          >
            Switch
          </p>
        </div>
      ) : (
        <p>Error loading profile</p>
      )}

      {/* Divider */}
      <hr className="my-2" />

      {/* Suggestions List */}
      <h6 className="text-muted mb-2">People you may know</h6>
      {loadingSuggestions ? (
        <p>Loading suggestions...</p>
      ) : suggestions.length > 0 ? (
        <div>
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="d-flex align-items-center justify-content-between p-2 rounded"
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={user.profilePic || "/assets/default-profile.jpg"}
                  alt={user.username}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "12px",
                  }}
                />
                <div style={{ textAlign: "left" }}>
                  <p className="mb-1">
                    <strong style={{ fontSize: "14px" }}>{user.username}</strong>
                  </p>
                  <p className="text-muted" style={{ fontSize: "12px" }}>
                    {user.mutualFriends} mutual friends
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                className="btn btn-sm btn-outline-primary"
                style={{
                  fontSize: "12px",
                  padding: "5px 14px",
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
}

export default Suggestions;
