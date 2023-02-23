// Author: Vrajesh Iyengar (58th Batch)
import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/exo-2";
import apiHelper from "./api-helper";
import { TextField, Autocomplete } from "@mui/material";
import AdminTimetable from "./components/AdminTimetable";
import StudentTimetable from "./components/StudentTimetable";

function App() {
  // const [currentUserId, setCurrentUserId] = useState("");
  const [jokaAuthToken, setJokaAuthToken] = useState(
    localStorage.getItem("joka_auth_token")
  );

  const [userIds, setUserIds] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const isAdmin = true;

  useEffect(() => {
    localStorage.setItem("joka_auth_token", jokaAuthToken);
    async function getUserIds() {
      await fetch(apiHelper.getUsersIds, {
        headers: {
          joka_auth_token: jokaAuthToken,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            console.log(
              "Unauthorized!!! call logout() here. logout must redirect to joka auth frontend"
            );
          } else {
            console.log("success", response);
          }
          return response;
        })
        .then((response) => (response.ok ? response.json() : { user_ids: [] }))
        .then((data) => {
          setUserIds(data.user_ids);
        })
        .catch((err) => {
          console.error("Failed to fetch userIds!!", err);
        });
    }
    getUserIds();
  }, []);

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  return (
    <div className="app">
      <div className="input-container">
        <Autocomplete
          autoComplete
          id="userid-serch-box"
          options={userIds}
          sx={{ width: 300, height: 100 }}
          renderInput={(params) => <TextField {...params} label="UserID" />}
          disabled={true}
        />
      </div>
      {isAdmin ? (
        <AdminTimetable data={appointments} setData={setAppointments} />
      ) : (
        <StudentTimetable data={appointments} />
      )}
    </div>
  );
}

export default App;
