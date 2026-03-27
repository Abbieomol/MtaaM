import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/App.css";

interface FollowButtonProps {
  targetemail: string;
}

const API_URL = "http://localhost:5000"; // your backend URL

const FollowButton: React.FC<FollowButtonProps> = ({ targetemail }) => {
  const { translate } = useContext(LanguageContext);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch follow status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/follow-status/${targetemail}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setIsFollowing(res.data.is_following);
      } catch (err) {
        console.error(err);
        setError("Failed to load follow status");
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [targetemail]);

  // Toggle follow/unfollow
  const toggleFollow = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${API_URL}/api/toggle-follow/${targetemail}/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      setIsFollowing(res.data.is_following);
    } catch (err) {
      console.error(err);
      setError("Action failed");
    }
  };

  if (loading) return null;
  if (error) return <p className="error">{error}</p>;

  return (
    <button
      className={`follow-btn ${isFollowing ? "unfollow" : "follow"}`}
      onClick={toggleFollow}
    >
      {isFollowing ? translate("Unfollow") : translate("Follow")}
    </button>
  );
};

export default FollowButton;