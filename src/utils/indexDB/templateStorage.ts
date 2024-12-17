interface Template {
  id?: number;
  html: string;
  notes?: string;
  updatedAt: Date;
}

export const saveTemplate = async (html: string, notes?: string): Promise<void> => {
  console.log('Saving template to IndexDB with notes:', { html: html.substring(0, 100), notes });
  const db = await openDB();
  
  const template: Template = {
    html,
    notes,
    updatedAt: new Date()
  };
  
  const transaction = db.transaction('templates', 'readwrite');
  const store = transaction.objectStore('templates');
  await store.add(template);
  console.log('Template and notes saved successfully');
};

export const getLatestTemplate = async (): Promise<Template | null> => {
  console.log('Fetching latest template from IndexDB...');
  const db = await openDB();
  
  const transaction = db.transaction('templates', 'readonly');
  const store = transaction.objectStore('templates');
  const index = store.index('updatedAt');
  
  const cursor = await index.openCursor(null, 'prev');
  if (cursor) {
    console.log('Latest template retrieved successfully with notes');
    return cursor.value;
  }
  console.log('No templates found');
  return null;
};

const openDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('emailCraftsman', 2);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('templates')) {
        const store = db.createObjectStore('templates', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        store.createIndex('updatedAt', 'updatedAt');
      }
    };
  });
};