import axios from "axios";
import React, { useState, useCallback } from "react";

const useHttpEvent = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    const url = requestConfig.url;
    const method = requestConfig.method;
    const body = requestConfig.body;
    const id = requestConfig.id;
    const signUpAuthToken = requestConfig.signUpAuthToken;
    setError(null);
    setIsLoading(true);
    if (method === "GET") {
      try {
        const response = await axios.get(url);
        const results = response.data;
        // console.log("Data", results)
        applyData(results);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    } else if (method === "POST") {
      try {
        await axios.post(url, body);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    } else if (method === "DELETE") {
      try {
        await axios.delete(`${url}/${id}.json`);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    } else if (method === "UPDATE") {
      let data;
      try {
        const response = await axios.get(`${url}/${id}/attendees.json`);
        data = response.data;
      } catch {
        setError(error.message);
      }

      try {
        const isSignedUp = data.includes(signUpAuthToken);
        if (!isSignedUp) {
          const updatedData = [...data, signUpAuthToken];
          const attendees = updatedData;
          await axios.put(`${url}/${id}/attendees.json`, attendees);
        } else {
          const index = data.indexOf(signUpAuthToken);
          if (index > -1) {
            data.splice(index, 1);
          }
          const updatedData = [...data];
          const attendees = updatedData;
          await axios.put(`${url}/${id}/attendees.json`, attendees);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttpEvent;
