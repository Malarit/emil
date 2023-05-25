import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000/api";

export const authPost = (data: { email: string; password: string }) => {
  return axios.post("/authorization", data);
};

export const regPost = (data: {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
}) => {
  return axios.post("/registration", data);
};

export const isMeGet = async () => {
  const req = await axios.get("/itsMe");
  return req.data;
};

export const getUser = async () => {
  const req = await axios.get<{
    firstName: string;
    secondName: string;
    about: string;
    city: string;
  }>("/user");
  return req.data;
};

export const putUser = async (data: { about: string; city: string }) => {
  return axios.put("/user", data);
};

export const clearMe = () => {
  return axios.get("/clearMe");
};

export const getVacancy = async () => {
  const req = await axios.get<
    {
      header: string;
      description: string;
      type: string;
      id: number;
    }[]
  >("/vacancy");
  return req.data;
};

export const postFeedback = (data: { vacancy_id: number }) => {
  return axios.post("/feedback", data);
};

export const getJustFeedback = async () => {
  const req = await axios.get<
    {
      user_id: number;
      vacancy_id: number;
      state: boolean;
      msg: string;
      createdAt: string;
    }[]
  >("/justFeedback");
  return req.data;
};
