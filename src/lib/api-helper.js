export async function fetchFromAdmin(endpoint, options = {}) {
    const adminUrl = process.env.ADMIN_API_URL || 'http://localhost:3001';
    const url = `${adminUrl}${endpoint}`;

    const config = {
        method: 'GET',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Admin API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[fetchFromAdmin] Error at ${endpoint}:`, error.message);
        throw error;
    }
}

export async function apiClient(endpoint, options = {}) {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(endpoint, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error || 'API returned an unsuccessful response');
    }

    return result.data;
}
