export function removeFromLocalStorage(field_name) {
  localStorage.removeItem(field_name);
}

export function fetchFromLocalStorage(field_name) {
  return localStorage.getItem(field_name);
}

export const storeInLocalStorage = {
  storeFirstName: (name) => {
    localStorage.setItem("user_first_name",name);
  },
  storeEmail: (email) => {
    localStorage.setItem("user_email",email);
  },
  storeloginCredential: (loginData) => {
    localStorage.setItem("login_credentials", loginData)
  }
}

export const saveAuthToken = (token) => {
  storeInLocalStorage.storeloginCredential(token);
};