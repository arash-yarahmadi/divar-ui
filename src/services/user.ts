import api from "config/api";

const getProfile = async () => {
  try {
    const response = await api.get("user/whoami");
    return { response: response, error: null };
  } catch (error: any) {
    return { response: null, error };
  }
};

export { getProfile };
