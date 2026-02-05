import React, { useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { userApi } from '@/services/userApi';
import { ConfirmationModal } from './ConfirmationModal';
import { Search, UserPlus, Mail, Phone, Edit2, Trash2 } from 'lucide-react';

interface UserTableProps {
    users: User[];
    onUserDeleted?: () => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onUserDeleted }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            try {
                await userApi.deleteUser(userToDelete);
                if (onUserDeleted) {
                    onUserDeleted();
                }
            } catch (error) {
                alert('Failed to delete user');
                console.error(error);
            } finally {
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
            }
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-violet-100 text-violet-700 border-violet-200';
            case 'user':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'guest':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <>
            <div className="glass-card overflow-hidden border border-slate-200/60">
                {users.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No users found</h3>
                        <p className="mt-1 text-slate-500">Get started by creating a new user.</p>
                        <div className="mt-6">
                            <Link href="/users/create" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <UserPlus className="-ml-1 mr-2 h-5 w-5" />
                                New User
                            </Link>
                        </div>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50/50 backdrop-blur-sm">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Contact Info
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 divide-y divide-slate-100">
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-indigo-50/30 transition-colors duration-150 group"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 flex items-center justify-center text-white font-bold shadow-sm">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-xs text-slate-500">ID: {user.id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <div className="text-sm text-slate-600 flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                {user.email}
                                            </div>
                                            <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                {user.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRoleBadgeColor(user.role || '')} capitalize`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 mr-1.5 self-center"></span>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Link
                                                href={`/users/edit/${user.id}`}
                                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                                                title="Edit User"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(user.id)}
                                                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
            />
        </>
    );
};
