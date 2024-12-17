export const saveApiKey = async (key: string): Promise<void> => {
  console.log('Saving API key to IndexDB...');
  const db = await openDB();
  
  const transaction = db.transaction('apiKeys', 'readwrite');
  const store = transaction.objectStore('apiKeys');
  await store.put(key, 'CLAUDE_API_KEY');
  console.log('API key saved successfully');
};

export const getApiKey = async (): Promise<string | null> => {
  console.log('Fetching API key from IndexDB...');
  const db = await openDB();
  
  const transaction = db.transaction('apiKeys', 'readonly');
  const store = transaction.objectStore('apiKeys');
  const key = await store.get('CLAUDE_API_KEY');
  console.log('API key retrieved successfully');
  return key;
};

const openDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('emailCraftsman', 2);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('apiKeys')) {
        db.createObjectStore('apiKeys');
      }
    };
  });
};