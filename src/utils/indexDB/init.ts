export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('Initializing IndexDB...');
    const request = indexedDB.open('emailCraftsman', 2);

    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log('IndexDB initialized successfully');
      resolve();
    };

    request.onupgradeneeded = (event) => {
      console.log('Upgrading IndexDB schema...');
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains('apiKeys')) {
        console.log('Creating apiKeys store...');
        db.createObjectStore('apiKeys');
      }
      
      if (!db.objectStoreNames.contains('templates')) {
        console.log('Creating templates store...');
        const templateStore = db.createObjectStore('templates', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        templateStore.createIndex('updatedAt', 'updatedAt');
      }
    };
  });
};