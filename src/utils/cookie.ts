interface CheckOtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const SetCookie = (tokens: CheckOtpResponse) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 30 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 30 * 60
  }`;
};

export { SetCookie };
