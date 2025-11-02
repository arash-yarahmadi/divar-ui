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

const getCookie = (cookieName: string) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

export { SetCookie, getCookie };
