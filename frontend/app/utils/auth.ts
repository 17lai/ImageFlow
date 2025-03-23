const API_KEY_KEY = 'imageflow_api_key';

export const getApiKey = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(API_KEY_KEY);
    }
    return null;
};

export const setApiKey = (apiKey: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(API_KEY_KEY, apiKey);
    }
};

export const removeApiKey = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(API_KEY_KEY);
    }
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        const response = await fetch('/validate-api-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        
        const data = await response.json();
        return data.valid === true;
    } catch (error) {
        console.error('API Key validation error:', error);
        return false;
    }
}; 