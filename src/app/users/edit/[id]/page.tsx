'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserForm } from '@/components/UserForm';
import { userApi } from '@/services/userApi';
import { User } from '@/types/user';

export default function EditUserPage() {
    const params = useParams();
    const id = params?.id as string;
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            loadUser(id);
        }
    }, [id]);

    const loadUser = async (userId: string) => {
        try {
            const data = await userApi.getUser(userId);
            setUser(data);
        } catch (err) {
            setError('Failed to load user data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="text-center py-20">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
                <p className="text-slate-500">{error || 'User not found'}</p>
            </div>
        );
    }

    return (
        <UserForm initialData={user} isEditMode={true} />
    );
}
