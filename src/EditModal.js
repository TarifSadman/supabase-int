import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { supabase } from "./SupaBaseClient";
import "./editModal.css";

const EditModal = ({ isModalVisible, handleModalClose, country, getCountries }) => {
  const [editedName, setEditedName] = useState(country.name);
  const [editedCountryCode, setEditedCountryCode] = useState(country.ccode);
  const [editedEmail, setEditedEmail] = useState(country.email);
  const [editedStatus, setEditedStatus] = useState(country.status);

  const saveEditedData = async () => {
    if (editedName && editedCountryCode) {
      try {
        const { data, error } = await supabase
          .from("countries")
          .update({
            name: editedName,
            ccode: editedCountryCode,
            email: editedEmail,
            status: editedStatus,
          })
          .eq("id", country.id);
          console.log(data);

        if (error) {
          console.error("Error updating:", error);
        } else {
          alert("Updated successfully!");
          getCountries();
          handleModalClose();
        }
      } catch (error) {
        console.error("Error updating:", error);
      }
    }
  };

  useEffect(() => {
    setEditedName(country.name);
    setEditedCountryCode(country.ccode);
    setEditedEmail(country.email);
    setEditedStatus(country.status);
  }, [country]);

  return (
        <Modal
          title="Edit Entry"
          open={isModalVisible}
          onOk={saveEditedData}
          onCancel={handleModalClose}
        >
          <div className="modal-container">
            <Input
              style={{ width: "100%" }}
              className="input-field"
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Input
              style={{ width: "100%" }}
              className="input-field"
              placeholder="Country Code"
              value={editedCountryCode}
              onChange={(e) => setEditedCountryCode(e.target.value)}
            />
            <Input
              style={{ width: "100%" }}
              className="input-field"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <Select
              style={{ width: "100%" }}
              value={editedStatus}
              onChange={(value) => setEditedStatus(value)}
            >
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={2}>Inactive</Select.Option>
            </Select>
          </div>
        </Modal>
  );
};

export default EditModal;
