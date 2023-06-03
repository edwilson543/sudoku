import axios from "axios";

const axiosUrl = "https://api.ipify.org/?format=json";

export default async function getPlayerIpAddress() {
  const res = await axios.get(axiosUrl);
  return res.data.ip;
}
