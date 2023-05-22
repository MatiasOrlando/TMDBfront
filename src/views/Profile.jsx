import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { contexto } from "../Context/Context";
import Button from "@mui/material/Button";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const { userLogged } = useContext(contexto);

  const fetchUserData = async () => {
    try {
      if (userLogged.data) {
        const user = await axios.get(
          `https://matiastmbdback.onrender.com/infoUser?email=${userLogged.data.email}`
        );
        setUserData(user.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userLogged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUrlAvatar = prompt("Enter the URL of your new avatar");
    if (newUrlAvatar && newUrlAvatar.trim() !== "") {
      await axios.put(
        `https://matiastmbdback.onrender.com/updateImg?email=${userLogged.data.email}`,
        {
          profileImg: newUrlAvatar,
        }
      );
      fetchUserData();
    }
  };

  return (
    <section style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        {userData && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              maxWidth: "500px",
              backgroundColor: "white",
              borderRadius: "15px",
              opacity: 0.9,
              padding: "20px",
              margin: "40px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={userData.profileImg}
                alt={userData.username}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div>
                <strong>Username:</strong> {userData.username}
              </div>
              <div>
                <strong>Email:</strong> {userData.email}
              </div>
              <Button type="submit" onClick={handleSubmit} variant="contained">
                Edit Avatar
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
