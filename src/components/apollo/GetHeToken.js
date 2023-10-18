import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APOLLO_CLIENT_HTTP_LINK_URI_TWO,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getHeToken: () =>
    instance({
      method: "POST",
      url: "",
      params: {
        grant_type: "client_credentials",
      },
      data: {
        query: `
            query GenerateToken{
                generateToken{
                  status
                  message
                  token 
                }
            }
           `,
      },
    }),
};
