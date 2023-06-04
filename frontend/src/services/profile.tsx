import axios from "axios";

const axiosUrl = "https://api.ipify.org/?format=json";

export default async function getPlayerIpAddress(): Promise<string> {
  /** Get the player's IP Address. This is used to identify the player in the backend. */
  const res = await axios.get(axiosUrl);
  return res.data.ip;
}
