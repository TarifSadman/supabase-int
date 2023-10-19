import React, { useEffect, useState } from "react";
import { supabase } from "./SupaBaseClient";
import "./App.css";
import { Spin, Table, Button, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newStatus, setNewStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedCountry, setEditedCountry] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    setLoading(true);
    const { data } = await supabase.from("countries").select();
    setCountries(data);
    setLoading(false);

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
          setNewStatus(1);
        }
      } catch (error) {
        console.error("Error adding:", error);
      }
    }
  }

  async function deleteCountry(id) {
    try {
      const { error } = await supabase.from("countries").delete().eq("id", id);
      if (error) {
        console.error("Error deleting:", error);
      } else {
        const updatedCountries = countries.filter((country) => country.id !== id);
        setCountries(updatedCountries);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }

  const handleEdit = (record) => {
    setEditedCountry(record);
    setIsEditModalVisible(true);
  };

  // Function to close the modal
  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  return (
      <div className="container">
        <h1>Create</h1>
        <div className="input-container">
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
    <Button
    type="primary"
    icon={<PlusCircleOutlined />}
    onClick={addCountry}
  >
    Add
  </Button>
  </div>

      <h1>List</h1>
      <div className="table-container">
      <div className="table-loader">
          {loading && <Spin size="large" />}
        </div>
        {!loading && (
          <Table
            className="country-table"
            dataSource={countries}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Country Code",
                dataIndex: "ccode",
                key: "ccode",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => (
                  <Tag color={status === 1 ? "green" : "red"}>
                    {status === 1 ? "Active" : "Inactive"}
                  </Tag>
                ),
              },
              {
                title: "Actions",
                key: "actions",
                render: (text, record) => (
                  <span>
                    <Button
                      type="danger"
                      style={{ background: "red", color: "white" }}
                      icon={<DeleteOutlined />}
                      onClick={() => deleteCountry(record.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginLeft: 8 }}
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </Button>
                  </span>
                ),
              },
            ]}
          />
        )}
      </div>
      <EditModal
        country={editedCountry}
        isModalVisible={isEditModalVisible}
        handleModalClose={handleEditModalClose}
        getCountries={getCountries}
      />
    </div>
  );
}

export default App;
