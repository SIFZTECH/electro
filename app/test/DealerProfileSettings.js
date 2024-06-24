"use client";

import { useState } from "react";
import MapComponent from "./MapComponent";

const DealerProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    abn: "",
    invoiceNumber: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    state: "",
    purchaseDate: "",
    description: "",
    stockFeedUrl: "",
    latitude: "",
    longitude: "",
  });

  const setCoordinates = ({ latitude, longitude }) => {
    setFormData({
      ...formData,
      latitude,
      longitude,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      {/* Other form fields here... */}
      <div>
        <label>Latitude</label>
        <input
          name="latitude"
          type="number"
          step="any"
          value={formData.latitude}
          onChange={handleChange}
          required
          readOnly
        />
      </div>
      <div>
        <label>Longitude</label>
        <input
          name="longitude"
          type="number"
          step="any"
          value={formData.longitude}
          onChange={handleChange}
          required
          readOnly
        />
      </div>
      <div>
        <MapComponent setCoordinates={setCoordinates} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default DealerProfileSettings;
