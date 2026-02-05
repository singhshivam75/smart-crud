'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { userApi } from '@/services/userApi';
import { UserTable } from '@/components/UserTable';
import { UserPlus, AlertCircle } from 'lucide-react';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 p-6 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            User Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your organization's users and roles.
          </p>
        </div>
        <Link
          href="/users/create"
          className="group inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-0.5"
        >
          <UserPlus className="w-5 h-5 mr-2 text-slate-400 group-hover:text-white transition-colors" />
          Add New User
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 text-[10px] font-bold">
              UI
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
          <p className="mt-1">{error}</p>
          <button onClick={loadUsers} className="mt-4 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
            Try Again
          </button>
        </div>
      ) : (
        <div className="animate-fade-in delay-100">
          <UserTable users={users} onUserDeleted={loadUsers} />
        </div>
      )}
    </div>
  );
}
