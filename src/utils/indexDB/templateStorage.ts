import { Template } from './types';
import { initDB } from './init';

export const saveTemplate = async (html: string, notes?: string): Promise<void> => {
  console.log('Saving template to IndexDB with notes:', { html: html.substring(0, 100), notes });
  const db = await initDB();
  
  const template: Template = {
    html,
    notes,
    updatedAt: new Date()
  };
  
  const transaction = db.transaction('templates', 'readwrite');
  const store = transaction.objectStore('templates');
  
  return new Promise((resolve, reject) => {
    const request = store.add(template);
    request.onsuccess = () => {
      console.log('Template and notes saved successfully');
      resolve();
    };
    request.onerror = () => {
      console.error('Error saving template:', request.error);
      reject(request.error);
    };
  });
};

export const updateTemplate = async (id: number, html: string, notes?: string): Promise<void> => {
  console.log('Updating template in IndexDB...');
  const db = await initDB();
  
  const template: Template = {
    id,
    html,
    notes,
    updatedAt: new Date()
  };
  
  const transaction = db.transaction('templates', 'readwrite');
  const store = transaction.objectStore('templates');
  
  return new Promise((resolve, reject) => {
    const request = store.put(template);
    request.onsuccess = () => {
      console.log('Template updated successfully');
      resolve();
    };
    request.onerror = () => {
      console.error('Error updating template:', request.error);
      reject(request.error);
    };
  });
};

export const getLatestTemplate = async (): Promise<Template | null> => {
  console.log('Fetching latest template from IndexDB...');
  const db = await initDB();
  
  const transaction = db.transaction('templates', 'readonly');
  const store = transaction.objectStore('templates');
  const index = store.index('updatedAt');
  
  return new Promise((resolve, reject) => {
    const request = index.openCursor(null, 'prev');
    
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        console.log('Latest template retrieved successfully');
        resolve(cursor.value as Template);
      } else {
        console.log('No templates found');
        resolve(null);
      }
    };
    
    request.onerror = () => {
      console.error('Error getting latest template:', request.error);
      reject(request.error);
    };
  });
};