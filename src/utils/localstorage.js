export function removeFromLocalStorage(field_name) {
    localStorage.removeItem(field_name);
  }
  
  export function fetchFromLocalStorage(field_name) {
    return localStorage.getItem(field_name);
  }
  
  export function storeInLocalStorage(field_name, value) {
    localStorage.setItem(field_name, value);
  }
  