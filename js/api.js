/**
 * @file api.js
 * @description Secure communication module with the GAS Backend.
 */

const GAS_API = {
    url: "https://script.google.com/macros/s/AKfycbwPW1-6tADbJpOJmMddJvtnffGMhsqFn6Ns8KkHe7Up0NbUPydLc-sTSrD865mHsKCcKg/exec",

    async get(action, params = {}) {
        const query = new URLSearchParams({
            action,
            ...params
        }).toString();

        try {
            const response = await fetch(`${this.url}?${query}`);
            const data = await response.json();
            if (data.status === 'error') throw new Error(data.message);
            return data.data;
        } catch (error) {
            console.error(`API Get Error [${action}]:`, error);
            throw error;
        }
    },

    async post(payload) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                // Note: Apps Script POST requires simple text or no-cors sometimes, 
                // but for modern security we use default fetch and JSON.
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.status === 'error') throw new Error(data.message);
            return data.data;
        } catch (error) {
            console.error(`API Post Error:`, error);
            throw error;
        }
    }
};

/**
 * Security utilities for the frontend
 */
const SecurityUtils = {
    sanitize(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
