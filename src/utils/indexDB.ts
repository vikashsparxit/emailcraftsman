const DB_NAME = 'emailCraftsman';
const STORES = {
  apiKeys: 'apiKeys',
  templates: 'templates'
};
const DB_VERSION = 2;

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('Initializing IndexDB...');
    const request = indexedDB.open(DB_NAME, DB_VERSION);

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
      
      // Create apiKeys store if it doesn't exist
      if (!db.objectStoreNames.contains(STORES.apiKeys)) {
        console.log('Creating apiKeys store...');
        db.createObjectStore(STORES.apiKeys);
      }
      
      // Create templates store if it doesn't exist
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

export const saveApiKey = async (key: string): Promise<void> => {
  console.log('Saving API key to IndexDB...');
  await initDB(); // Ensure DB is initialized before saving
  
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
  await initDB(); // Ensure DB is initialized before getting key
  
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

interface Template {
  id?: number;
  html: string;
  updatedAt: Date;
}

export const saveTemplate = async (html: string): Promise<void> => {
  console.log('Saving template to IndexDB...');
  await initDB(); // Ensure DB is initialized before saving
  
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
      saveRequest.onerror = () => {
        console.error('Error saving template:', saveRequest.error);
        reject(saveRequest.error);
      };
    };
    
    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };
  });
};

export const updateTemplate = async (id: number, html: string): Promise<void> => {
  console.log('Updating template in IndexDB...');
  await initDB(); // Ensure DB is initialized before updating
  
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
      updateRequest.onerror = () => {
        console.error('Error updating template:', updateRequest.error);
        reject(updateRequest.error);
      };
    };
    
    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };
  });
};

export const getLatestTemplate = async (): Promise<Template | null> => {
  console.log('Fetching latest template from IndexDB...');
  await initDB(); // Ensure DB is initialized before fetching
  
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
      getRequest.onerror = () => {
        console.error('Error getting latest template:', getRequest.error);
        reject(getRequest.error);
      };
    };
    
    request.onerror = () => {
      console.error('Error opening IndexDB:', request.error);
      reject(request.error);
    };
  });
};