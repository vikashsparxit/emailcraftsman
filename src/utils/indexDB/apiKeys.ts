import { initDB } from './init';

export const saveApiKey = async (key: string): Promise<void> => {
  console.log('Saving API key to IndexDB...');
  await initDB();
  
  const request = indexedDB.open('emailCraftsman');
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('apiKeys', 'readwrite');
      const store = transaction.objectStore('apiKeys');
      
      const saveRequest = store.put(key, 'CLAUDE_API_KEY');
      
      saveRequest.onsuccess = () => {
        console.log('API key saved successfully');
        resolve();
      };
      saveRequest.onerror = () => {
        console.error('Error saving API key:', saveRequest.error);
        reject(saveRequest.error);
      };
    };
    
    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };
  });
};

export const getApiKey = async (): Promise<string | null> => {
  console.log('Fetching API key from IndexDB...');
  await initDB();
  
  const request = indexedDB.open('emailCraftsman');
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('apiKeys', 'readonly');
      const store = transaction.objectStore('apiKeys');
      
      const getRequest = store.get('CLAUDE_API_KEY');
      
      getRequest.onsuccess = () => {
        console.log('API key retrieved successfully');
        resolve(getRequest.result);
      };
      getRequest.onerror = () => {
        console.error('Error getting API key:', getRequest.error);
        reject(getRequest.error);
      };
    };
    
    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };
  });
};