import { fetchFromLocalStorage, removeFromLocalStorage } from "./localstorage";

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