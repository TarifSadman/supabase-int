import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Spin, Button } from "antd";
import { supabase } from "./SupaBaseClient";
import "./editModal.css";

const EditModal = ({ isModalVisible, handleModalClose, country, getCountries }) => {
  const [editedName, setEditedName] = useState(country.name);
  const [editedCountryCode, setEditedCountryCode] = useState(country.ccode);
  const [editedEmail, setEditedEmail] = useState(country.email);
  const [editedStatus, setEditedStatus] = useState(country.status);
  const [isLoading, setIsLoading] = useState(false);

  const saveEditedData = async () => {
    if (editedName && editedCountryCode) {
      setIsLoading(true);
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
          setIsLoading(false);
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
          footer={[
            <Button key="back" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={saveEditedData}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin size="small" />
              ) : (
                "Update"
              )}
            </Button>,
          ]}
        >
          <div className="modal-container">
          <label htmlFor="name">Name</label>
            <Input
              style={{ width: "100%" }}
              className="input-field"
              placeholder="Name"
              name="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <label htmlFor="ccode">C-Code</label>
            <Input
              style={{ width: "100%" }}
              name="ccode"
              className="input-field"
              placeholder="Country Code"
              value={editedCountryCode}
              onChange={(e) => setEditedCountryCode(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              style={{ width: "100%" }}
              className="input-field"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <label htmlFor="status">Status</label>
            <Select
              name="status"
              style={{ width: "100%" }}
              value={editedStatus}
              onChange={(value) => setEditedStatus(value)}
            >
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={2}>Inactive</Select.Option>
            </Select>
          </div>
          {/* {isLoading && <Spin size="large" />} */}
        </Modal>
  );
};

export default EditModal;
