const STORAGE_KEY = "kaji:add-to-home-modal:hide";

export const shouldShowAddToHomeModal = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) !== "true";
};

export const hideAddToHomeModal = () => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "true");
};
