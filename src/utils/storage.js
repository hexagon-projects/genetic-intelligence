export const loadFromStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading from localStorage', err);
    return undefined;
  }
};

export const saveToStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving to localStorage', err);
  }
};

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error clearing localStorage', err);
  }
};