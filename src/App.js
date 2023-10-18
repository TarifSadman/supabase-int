import { useEffect, useState } from "react";
import { supabase } from "./SupaBaseClient";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newStatus, setNewStatus] = useState(1);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  async function addCountry() {
    if (newCountryName && newCountryCode) {
      try {
        const { data, error } = await supabase
          .from("countries")
          .insert([
            {
              name: newCountryName,
              ccode: newCountryCode,
              email: newEmail,
              status: newStatus,
            },
          ]);
        alert("Added successfully!");
        getCountries();
        if (error) {
          console.error("Error adding:", error);
        } else {
          setCountries([...countries, ...data]);
          setNewCountryName("");
          setNewCountryCode("");
          setNewEmail("");
          setNewStatus(1); // Set the default value to 1
        }
      } catch (error) {
        console.error("Error adding:", error);
      }
    }
  }

  return (
    <div className="container">
      <h1>Add New</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Name"
        value={newCountryName}
        onChange={(e) => setNewCountryName(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Country Code"
        value={newCountryCode}
        onChange={(e) => setNewCountryCode(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <select
        className="select-field"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value={1}>Active</option>
        <option value={2}>Inactive</option>
      </select>
      <button className="add-button" onClick={addCountry}>
        Add
      </button>
      <h1>List</h1>
      <ul className="country-list">
        {countries.map((country) => (
          <li key={country.id}>
            {country.name} ({country.ccode}) - {country.email} -{" "}
            {country.status === 1 ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
