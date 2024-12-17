const DB_NAME = 'emailCraftsman';
const STORES = {
  apiKeys: 'apiKeys',
  templates: 'templates'
};
const DB_VERSION = 2;

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORES.apiKeys)) {
        db.createObjectStore(STORES.apiKeys);
      }
      
      if (!db.objectStoreNames.contains(STORES.templates)) {
        const templateStore = db.createObjectStore(STORES.templates, { keyPath: 'id', autoIncrement: true });
        templateStore.createIndex('updatedAt', 'updatedAt');
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
      const transaction = db.transaction(STORES.apiKeys, 'readwrite');
      const store = transaction.objectStore(STORES.apiKeys);
      
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
      const transaction = db.transaction(STORES.apiKeys, 'readonly');
      const store = transaction.objectStore(STORES.apiKeys);
      
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

interface Template {
  id?: number;
  html: string;
  updatedAt: Date;
}

export const saveTemplate = async (html: string): Promise<void> => {
  console.log('Saving template to IndexDB...');
  const request = indexedDB.open(DB_NAME);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORES.templates, 'readwrite');
      const store = transaction.objectStore(STORES.templates);
      
      const template: Template = {
        html,
        updatedAt: new Date()
      };
      
      const saveRequest = store.add(template);
      
      saveRequest.onsuccess = () => {
        console.log('Template saved successfully');
        resolve();
      };
      saveRequest.onerror = () => reject(saveRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};

export const updateTemplate = async (id: number, html: string): Promise<void> => {
  console.log('Updating template in IndexDB...');
  const request = indexedDB.open(DB_NAME);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORES.templates, 'readwrite');
      const store = transaction.objectStore(STORES.templates);
      
      const template: Template = {
        id,
        html,
        updatedAt: new Date()
      };
      
      const updateRequest = store.put(template);
      
      updateRequest.onsuccess = () => {
        console.log('Template updated successfully');
        resolve();
      };
      updateRequest.onerror = () => reject(updateRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};

export const getLatestTemplate = async (): Promise<Template | null> => {
  console.log('Fetching latest template from IndexDB...');
  const request = indexedDB.open(DB_NAME);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORES.templates, 'readonly');
      const store = transaction.objectStore(STORES.templates);
      const index = store.index('updatedAt');
      
      const getRequest = index.openCursor(null, 'prev');
      
      getRequest.onsuccess = () => {
        const cursor = getRequest.result;
        if (cursor) {
          console.log('Latest template retrieved successfully');
          resolve(cursor.value);
        } else {
          console.log('No templates found');
          resolve(null);
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};