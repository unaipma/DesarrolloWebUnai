// Patrón Facade: unifica almacenamiento y acceso a datos
const STORAGE_KEY = "tasks";

export const StorageFacade = {
  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
