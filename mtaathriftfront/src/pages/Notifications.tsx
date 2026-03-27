import { useState } from "react";
import content from "../content";
import Card from "../components/Card";
//import Navbar from "../components/Navbar";
import { mockNotifications } from "../data/mockNotifications";
import "../App.css";

function Notifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotifications = notificationsEnabled
    ? mockNotifications.filter((n) =>
        selectedCategory === "All"
          ? true
          : n.category === selectedCategory
      )
    : [];

  return (
    <><h1 className="page-title">{content.notifications.title}</h1><h2 className="page-subtitle">{content.notifications.subtitle}</h2><p className="page-description">
    {content.notifications.description}
  </p><div className="filters">
      <label>
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
        Enable Notifications
      </label>
    </div><div className="filters">
      <label htmlFor="category">Filter by Category</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {content.notifications.categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div><div className="card-grid">
      {notificationsEnabled ? (
        filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <Card
              key={n.id}
              title={n.title}
              description={n.description} />
          ))
        ) : (
          <p>No notifications in this category.</p>
        )
      ) : (
        <p>Notifications are turned off.</p>
      )}
    </div></>
  );
}

export default Notifications;