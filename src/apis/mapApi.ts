import axios from "axios";

// Tạo instance riêng cho Map API để đảm bảo trỏ đúng localhost:8080 theo yêu cầu
const mapApiInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mapApi = {
  getAllLayers: async () => {
    const response = await mapApiInstance.get("/map/all-layers");
    return response.data;
  },
  getHouseholds: async () => {
    const response = await mapApiInstance.get("/map/households");
    return response.data;
  },
};
