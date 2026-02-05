'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userFormSchema } from '@/config/userFormSchema';
import { InputField } from './InputField';
import { User, UserFormData } from '@/types/user';
import { userApi } from '@/services/userApi';
import { Loader2, AlertCircle } from 'lucide-react';

interface UserFormProps {
    initialData?: User;
    isEditMode?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, isEditMode = false }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (initialData) {
            const data: Record<string, string> = {};
            userFormSchema.forEach(field => {
                const val = initialData[field.name as keyof User];
                if (val !== undefined && val !== null) {
                    data[field.name] = String(val);
                }
            });
            setFormData(data);
        }
    }, [initialData]);

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        userFormSchema.forEach(field => {
            const value = formData[field.name] || '';

            if (field.required && !value.trim()) {
                newErrors[field.name] = `${field.label} is required`;
                isValid = false;
            } else if (field.validation?.pattern && !field.validation.pattern.test(value)) {
                newErrors[field.name] = field.validation.message || 'Invalid format';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const payload = formData as unknown as UserFormData;

            if (isEditMode && initialData) {
                await userApi.updateUser(initialData.id, payload);
            } else {
                await userApi.createUser(payload);
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Submission failed:', error);
            setSubmitError('Failed to save user. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card p-8 max-w-2xl mx-auto border border-white/40">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                    {isEditMode ? 'Edit User Profile' : 'Create New User'}
                </h2>
                <p className="text-slate-500 mt-2">
                    {isEditMode ? 'Update the user details below' : 'Fill in the information to add a new user'}
                </p>
            </div>

            {submitError && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    {submitError}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userFormSchema.map((field) => (
                    <div key={field.name} className={field.name === 'role' ? 'md:col-span-2' : ''}>
                        <InputField
                            field={field}
                            value={formData[field.name] || ''}
                            onChange={(val) => handleChange(field.name, val)}
                            error={errors[field.name]}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 border border-transparent rounded-lg hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                            Saving...
                        </span>
                    ) : (
                        isEditMode ? 'Update User' : 'Create User'
                    )}
                </button>
            </div>
        </form>
    );
};
