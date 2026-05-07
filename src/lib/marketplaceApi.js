import axios from 'axios';

const TOKEN_KEY = 'signal-market-token';
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

const readToken = () => window.localStorage.getItem(TOKEN_KEY);

const writeToken = (token) => {
    if (token) {
        window.localStorage.setItem(TOKEN_KEY, token);
        return;
    }

    window.localStorage.removeItem(TOKEN_KEY);
};

const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = readToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    else {
        delete config.headers.Authorization;
    }

    return config;
});

const request = async (method, path, data) => {
    try {
        const response = await apiClient({
            url: path,
            method,
            data,
        });
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (typeof error.response?.data?.message === 'string') {
                throw new Error(error.response.data.message);
            }

            if (error.response?.status) {
                throw new Error(`Request failed: ${error.response.status}`);
            }

            throw new Error('Could not reach the marketplace server. Check that the backend is running and try again.');
        }

        throw error;
    }
};

const getMarketplaceRuntimeInfo = () => ({ mode: 'remote', apiBase: API_BASE });

const marketplaceApi = {
    getStore: async () => {
        const response = await request('GET', '/api/bootstrap');
        return response.store;
    },
    signIn: async (payload) => {
        const response = await request('POST', '/api/auth/sign-in', payload);
        writeToken(response.token);
        return response.store;
    },
    signUp: async (payload) => {
        const response = await request('POST', '/api/auth/sign-up', payload);
        writeToken(response.token);
        return response.store;
    },
    signOut: async () => {
        writeToken(null);
        const response = await request('GET', '/api/bootstrap');
        return response.store;
    },
    updateProfile: async (payload) => {
        const response = await request('PATCH', '/api/profile', payload);
        return response.store;
    },
    toggleFavorite: async (listingId) => {
        const response = await request('POST', `/api/favorites/${listingId}/toggle`);
        return response.store;
    },
    toggleCart: async (listingId) => {
        const response = await request('POST', `/api/cart/${listingId}/toggle`);
        return response.store;
    },
    createListing: async (payload) => {
        const response = await request('POST', '/api/listings', payload);
        return response.store;
    },
    updateListing: async (listingId, payload) => {
        const response = await request('PATCH', `/api/listings/${listingId}`, payload);
        return response.store;
    },
    deleteListing: async (listingId) => {
        const response = await request('DELETE', `/api/listings/${listingId}`);
        return response.store;
    },
    updateListingStatus: async (listingId, status) => {
        const response = await request('PATCH', `/api/listings/${listingId}/status`, { status });
        return response.store;
    },
    addModerationNote: async (listingId, note) => {
        const response = await request('POST', `/api/listings/${listingId}/notes`, { note });
        return response.store;
    },
    advanceOrderStatus: async (orderId, status) => {
        const response = await request('PATCH', `/api/orders/${orderId}/advance`, status ? { status } : {});
        return response.store;
    },
    sendOrderMessage: async (orderId, text) => {
        const response = await request('POST', `/api/orders/${orderId}/messages`, { text });
        return response.store;
    },
    addListingReview: async (listingId, payload) => {
        const response = await request('POST', `/api/listings/${listingId}/reviews`, payload);
        return response.store;
    },
    updateSellerStatus: async (userId, status) => {
        const response = await request('PATCH', `/api/admin/sellers/${userId}/status`, { status });
        return response.store;
    },
    checkout: async (payload) => request('POST', '/api/checkout', payload),
    requestPasswordReset: async () => request('POST', '/api/auth/request-password-reset'),
    resetPassword: async (token, newPassword) => request('POST', '/api/auth/reset-password', { token, newPassword }),
};

export { getMarketplaceRuntimeInfo };
export default marketplaceApi;
