export const authenPaths = {
  LOGIN: getV1Path("authen/login"),
  SIGNUP: getV1Path("authen/sign-up"),
  LOGOUT: getV1Path("authen/log-out"),
};

export const profilePaths = {
  PROFILE: getV1Path("personal/me"),
};

function getV1Path(path: String) {
  return `${process.env.REACT_APP_BASE_URL}/api/v1/${path}`;
}
