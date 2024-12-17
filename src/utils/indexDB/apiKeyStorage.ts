import { initDB } from './init';

export const saveApiKey = async (key: string): Promise<void> => {
  console.log('Saving API key to IndexDB...');
  const db = await initDB();
  
  const transaction = db.transaction('apiKeys', 'readwrite');
  const store = transaction.objectStore('apiKeys');
  
  return new Promise((resolve, reject) => {
    const request = store.put(key, 'CLAUDE_API_KEY');
    
    request.onsuccess = () => {
      console.log('API key saved successfully');
      resolve();
    };
    request.onerror = () => {
      console.error('Error saving API key:', request.error);
      reject(request.error);
    };
  });
};

export const getApiKey = async (): Promise<string | null> => {
  console.log('Fetching API key from IndexDB...');
  const db = await initDB();
  
  const transaction = db.transaction('apiKeys', 'readonly');
  const store = transaction.objectStore('apiKeys');
  
  return new Promise((resolve, reject) => {
    const request = store.get('CLAUDE_API_KEY');
    
    request.onsuccess = () => {
      console.log('API key retrieved successfully');
      resolve(request.result);
    };
    request.onerror = () => {
      console.error('Error getting API key:', request.error);
      reject(request.error);
    };
  });
};