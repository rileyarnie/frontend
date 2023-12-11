import axios from "axios";

const getSensorData = () => {
  return axios.get(
    "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
  );
};
