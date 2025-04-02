export function removeDataFromLocalStorage(field_name) {
  localStorage.removeItem(field_name);
}

export function fetchFromLocalStorage(field_name) {
  return localStorage.getItem(field_name);
}

export const storeInLocalStorage = {
  storeFirstName: (name) => {
    localStorage.setItem("user_first_name", name);
  },
  storeEmail: (email) => {
    localStorage.setItem("user_email", email);
  },
  storeProfileImage: (profileImage) => {
    localStorage.setItem("profile_image", profileImage);
  },
  storeloginCredential: (loginData) => {
    localStorage.setItem("login_credentials", loginData)
  },
  storeUserType: (userType) => {
    localStorage.setItem("user_type", userType)
  },
  storeVerificationCode: (isCode) => {
    localStorage.setItem("isCodeGenerate", isCode)
  },
}

export const saveAuthToken = (token) => {
  storeInLocalStorage.storeloginCredential(token);
};



export const getAuthToken = () => {
  return fetchFromLocalStorage("login_credentials")
};

export const removeFromLocalStorage = {
  signout: () => {
    clearLocalStorage();
  },
}

export const signout = () => {
  clearLocalStorage();
}

const clearLocalStorage = () => {
  removeDataFromLocalStorage("login_credentials");
  removeDataFromLocalStorage("user_first_name");
  removeDataFromLocalStorage("user_email");
  removeDataFromLocalStorage("profile_image");
  removeDataFromLocalStorage("user_type");
}
