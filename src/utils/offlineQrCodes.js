import Dexie from 'dexie';

const db = new Dexie('qr-codes');

db.version(1).stores({
    qrCodes: '&content',
});

export default {
    add: async (content, date) => {
        try {
            await db.qrCodes.add({
                content,
                date: date || new Date().toISOString(),
            });
        } catch {
            // Silent catch
            // Le QR code est déjà dans IndexedDB
        }
    },
    getAll: async () => {
        return db.qrCodes.toArray();
    },
    delete: async (content) => {
        return db.qrCodes.delete(content);
    },
}