const DB_NAME = 'emailCraftsman';
const STORES = {
  apiKeys: 'apiKeys',
  templates: 'templates'
};
const DB_VERSION = 2;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    console.log('Initializing IndexDB...');
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log('IndexDB initialized successfully');
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      console.log('Upgrading IndexDB schema...');
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORES.apiKeys)) {
        console.log('Creating apiKeys store...');
        db.createObjectStore(STORES.apiKeys);
      }
      
      if (!db.objectStoreNames.contains(STORES.templates)) {
        console.log('Creating templates store...');
        const templateStore = db.createObjectStore(STORES.templates, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        templateStore.createIndex('updatedAt', 'updatedAt');
      }
    };
  });
};