import api from "config/api";

interface SendOtpResponse {
  success: boolean;
  message: string;
}

interface CheckOtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

interface SendOtpResult {
  response: SendOtpResponse | null;
  error: any;
}

interface CheckOtpResult {
  response: CheckOtpResponse | null;
  error: any;
}

const sendOtp = async (mobile: string): Promise<SendOtpResult> => {
  try {
    const response = await api.post<SendOtpResponse>("auth/send-otp", {
      mobile,
    });
    return { response: response.data, error: null };
  } catch (error: any) {
    return { response: null, error };
  }
};

const checkOtp = async (
  mobile: string,
  code: string
): Promise<CheckOtpResult> => {
  try {
    const response = await api.post<CheckOtpResponse>("auth/check-otp", {
      mobile,
      code,
    });
    return { response: response.data, error: null };
  } catch (error: any) {
    return { response: null, error };
  }
};

export { sendOtp, checkOtp };
