export const AuthenPath = {
    LOGIN: getV1Path("authentications/login"),
    REGISTER: getV1Path("authentications/register"),
};

export const HotelPath = {
    LIST: getV1Path("hotels/list"),
    DETAILS: getV1Path("hotels/details"),
    CREATE: getV1Path("hotels/create-hotel"),
    UPDATE: getV1Path("hotels/update-hotels"),
    DELETE: getV1Path("hotels/delete-hotels")
}

function getV1Path(path: String) {
    return `${process.env.REACT_APP_BASE_URL}/api/v1/${path}`;
  }