import axios from "axios";

const lemonSqueezyClient = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_URL,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
  });
};

export default lemonSqueezyClient;
