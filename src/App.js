import { useEffect, useState } from "react";
import { supabase } from "./SupaBaseClient";

function App() {
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
          setNewStatus(null);
        }
      } catch (error) {
        console.error("Error adding:", error);
      }
    }
  }

  return (
    <div style={{ padding: 15 }}>
      <h1>Add New</h1>
      <input
        style={{ padding: 10, margin: 5}}
        type="text"
        placeholder="name"
        value={newCountryName}
        onChange={(e) => setNewCountryName(e.target.value)}
      />
      <input
        style={{ padding: 10 }}
        type="text"
        placeholder="country code"
        value={newCountryCode}
        onChange={(e) => setNewCountryCode(e.target.value)}
      />
      <input
      style={{ padding: 10, margin: 5 }}
      type="text"
      placeholder="Email"
      value={newEmail}
      onChange={(e) => setNewEmail(e.target.value)}
      />
      <select
      style={{ padding: 10, margin: 5 }}
      value={newStatus}
      defaultValue={1}
      onChange={(e) => setNewStatus(e.target.value)}
      >
      <option value={1}>Active</option>
      <option value={2}>Inactive</option>
      </select>
      <button style={{ padding: 10, margin: 5 }} onClick={addCountry}>Add</button>
      <h1>List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            {country.name} ({country.ccode}) - {country.email} - {country.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
