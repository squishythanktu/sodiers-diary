import { User } from '../types/user.type';

export const LocalStorageEventTarget = new EventTarget();

export const getAccessTokenFromLocalStorage = () => localStorage.getItem('token') || '';

export const setAccessTokenToLS = (token: string) => {
  localStorage.setItem('token', token);
};

export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(profile) : null;
};

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const clearLS = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('profile');
  LocalStorageEventTarget.dispatchEvent(new Event('clearLS'));
};
