const DB_NAME = 'emailCraftsman';
const STORE_NAME = 'apiKeys';
const DB_VERSION = 1;

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const saveApiKey = async (key: string): Promise<void> => {
  console.log('Saving API key to IndexDB...');
  const request = indexedDB.open(DB_NAME);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const saveRequest = store.put(key, 'CLAUDE_API_KEY');
      
      saveRequest.onsuccess = () => {
        console.log('API key saved successfully');
        resolve();
      };
      saveRequest.onerror = () => reject(saveRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};

export const getApiKey = async (): Promise<string | null> => {
  console.log('Fetching API key from IndexDB...');
  const request = indexedDB.open(DB_NAME);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      const getRequest = store.get('CLAUDE_API_KEY');
      
      getRequest.onsuccess = () => {
        console.log('API key retrieved successfully');
        resolve(getRequest.result);
      };
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};