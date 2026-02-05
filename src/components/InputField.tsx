import React from 'react';
import { FormField } from '@/config/userFormSchema';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface InputFieldProps {
    field: FormField;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ field, value, onChange, error }) => {
    return (
        <div className="mb-2 relative group">
            <label htmlFor={field.name} className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">
                {field.label} {field.required && <span className="text-pink-500">*</span>}
            </label>

            <div className="relative">
                {field.type === 'select' ? (
                    <div className="relative">
                        <select
                            id={field.name}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className={`block w-full px-4 py-3 rounded-xl border bg-white/50 backdrop-blur-sm transition-all duration-200 
                                text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 
                                appearance-none cursor-pointer
                                ${error
                                    ? 'border-red-300 focus:border-red-500 bg-red-50/10'
                                    : 'border-slate-200 focus:border-indigo-500 hover:border-slate-300'
                                }`}
                        >
                            <option value="" disabled>Select {field.label}</option>
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                ) : (
                    <input
                        type={field.type}
                        id={field.name}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.placeholder}
                        className={`block w-full px-4 py-3 rounded-xl border bg-white/50 backdrop-blur-sm transition-all duration-200 
                            text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 
                            ${error
                                ? 'border-red-300 focus:border-red-500 bg-red-50/10'
                                : 'border-slate-200 focus:border-indigo-500 hover:border-slate-300'
                            }`}
                    />
                )}
            </div>

            {error && (
                <div className="absolute -bottom-5 left-1 text-xs text-red-500 font-medium flex items-center animate-fade-in">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {error}
                </div>
            )}
        </div>
    );
};
