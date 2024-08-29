'use client';

import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Articles Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Articles</h2>
          <p className="text-gray-600">Total Articles: 120</p>
          <p className="text-gray-600">Drafts: 10</p>
          <p className="text-gray-600">Published: 110</p>
          <Link
            href="/admin/articles"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Manage Articles
          </Link>
        </div>

        {/* Users Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <p className="text-gray-600">Total Users: 300</p>
          <p className="text-gray-600">Active Users: 250</p>
          <p className="text-gray-600">Banned Users: 10</p>
          <Link
            href="/admin/users"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Manage Users
          </Link>
        </div>

        {/* Categories Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <p className="text-gray-600">Total Categories: 20</p>
          <p className="text-gray-600">Active Categories: 18</p>
          <p className="text-gray-600">Archived Categories: 2</p>
          <Link
            href="/admin/categories"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Manage Categories
          </Link>
        </div>
      </div>

      {/* Other admin tasks */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/articles/create"
            className="bg-blue-500 text-white rounded-lg py-3 px-4 text-center"
          >
            Create New Article
          </Link>
          <Link
            href="/admin/categories/create"
            className="bg-blue-500 text-white rounded-lg py-3 px-4 text-center"
          >
            Create New Category
          </Link>
          <Link
            href="/admin/users/create"
            className="bg-blue-500 text-white rounded-lg py-3 px-4 text-center"
          >
            Create New User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
