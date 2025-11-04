import api from "src/config/api";

interface formCategory {
  name: string;
  slug?: string;
  icon: string;
}

const addCategory = (data: formCategory) => api.post("category", data);

const getCategory = () => api.get("category");

export { addCategory, getCategory };
