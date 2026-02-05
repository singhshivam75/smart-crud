import { UserFormData } from "@/types/user";

export type FormFieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select';

export interface FormField {
    name: keyof UserFormData; // Enforce type safety for field names
    label: string;
    type: FormFieldType;
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[]; // For select inputs
    validation?: {
        pattern?: RegExp;
        message?: string;
    };
}

export const userFormSchema: FormField[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'Enter first name'
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Enter last name'
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'john@example.com',
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address"
        }
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '123-456-7890',
        validation: {
            pattern: /^\+?[\d\s-]{10,}$/,
            message: "Enter a valid phone number (min 10 digits)"
        }
    },
    {
        name: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'Guest', value: 'guest' }
        ]
    }
];
