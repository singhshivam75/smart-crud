import { User, UserFormData } from '@/types/user';

const API_URL = '/api/users';

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${res.statusText}`);
    }
    return res.json();
};

export const userApi = {
    getUsers: async (): Promise<User[]> => {
        const res = await fetch(API_URL, { cache: 'no-store' });
        return handleResponse(res);
    },

    getUser: async (id: string): Promise<User> => {
        const res = await fetch(`${API_URL}?id=${id}`, { cache: 'no-store' });
        return handleResponse(res);
    },

    createUser: async (data: UserFormData): Promise<User> => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    updateUser: async (id: string, data: UserFormData): Promise<User> => {
        const res = await fetch(`${API_URL}?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    deleteUser: async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}?id=${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    },
};
