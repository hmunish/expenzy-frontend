export const setLocalStorageAuthToken = (token) => localStorage.setItem('Authorization', token);

export const getLocalStorageAuthToken = () => localStorage.getItem('Authorization');
