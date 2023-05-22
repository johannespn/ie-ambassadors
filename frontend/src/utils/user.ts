export function clearLocalStorage() {
  localStorage.removeItem("token");
}

export function isLoggedIn() {
  return localStorage.getItem("token");
}
