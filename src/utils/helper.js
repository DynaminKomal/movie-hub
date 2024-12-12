import { fetchFromLocalStorage, removeFromLocalStorage, storeInLocalStorage } from "./localstorage";
import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  try {
    if (fetchFromLocalStorage("login_credentials")) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    removeFromLocalStorage.loginCredential();
  }
};

export function getUserRole() {
  const token = fetchFromLocalStorage("login_credentials");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    storeInLocalStorage.storeUserType(decodedToken.userType)
    return decodedToken.userType;
  } catch (error) {
    return null;
  }
}