import logo from "./VIG.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    phone: "",
  });

  // 2. Handle input changes dynamically using the 'name' attribute
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the browser from reloading the page
    console.log("Form Submitted Data:", formData);
    //alert(`Welcome, ${formData.client}!`);
    const urlpost = process.env.REACT_APP_TEST_API + "/api/write";
    const payload = JSON.stringify({
      values: [formData.client, formData.phone],
    });
    try {
      const response = await fetch(urlpost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage(`Success! Created post with ID: ${data.message}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {/*
      <header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
        <p>pagina en desarrollo...</p>
      </header>
		*/}

      <form onSubmit={handleSubmit} className="App-header">
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username">Cliente: </label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Celular: </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {" "}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
}

export default App;
