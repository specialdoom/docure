import { writable } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable({});

export const isAdmin = () => {
  return user.roles.includes("admin");
};
export const isEditor = () => {
  return user.roles.includes("editor");
};
