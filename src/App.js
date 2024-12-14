import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Destructure state to get name, email, and message
    const { name, email, message } = data;

    // Ensure all fields are filled out
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/skoczylaola/google_sheets/UuDrWHxUQaRecHBy?tabId=Sheet1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([[name, email, message, new Date().toLocaleString()]]),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      // Clear the form fields upon successful submission
      setData({ name: "", email: "", message: "" });

      console.log("Form submitted successfully:", result);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imie i nazwisko:
        <input type="text" name="name" value={data.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={data.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Message:
        <textarea name="message" value={data.message} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
