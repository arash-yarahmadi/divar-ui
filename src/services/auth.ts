import api from "../config/api";

interface SendOtpResponse {
  success: boolean;
  message: string;
}

interface SendOtpResult {
  response: SendOtpResponse | null;
  error: any;
}

const sendOtp = async (mobile: string): Promise<SendOtpResult> => {
  try {
    const response = await api.post<SendOtpResponse>("/auth/send-otp", {
      mobile,
    });
    return { response: response.data, error: null };
  } catch (error: any) {
    return { response: null, error };
  }
};

export { sendOtp };
