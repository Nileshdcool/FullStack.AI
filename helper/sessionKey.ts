import { v4 as uuidv4 } from 'uuid'; // Install 'uuid' library for generating UUIDs

export const getSessionKey = () => {
  const existingKey = sessionStorage.getItem('sessionKey');
  if (existingKey) {
    return existingKey;
  }
  const newKey = uuidv4();
  sessionStorage.setItem('sessionKey', newKey);
  return newKey;
};