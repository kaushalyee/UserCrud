"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";
import { useRouter } from "next/navigation";

export default function UserList() {
  const router = useRouter();
  const { list: users, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User List</h1>
        <button
          onClick={() => router.push("/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create User
        </button>
      </div>

      {/* Status Messages */}
      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && users.length === 0 && <p className="text-gray-500">No users found.</p>}

      {/* User List */}
      <div className="flex flex-col gap-4">
        {users.map(user => (
          <div
            key={user.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-200 transition"
          >
            {/* User Info */}
            <div className="flex-1 mb-3 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-700">{user.email}</p>
              <p className="text-gray-700">{user.phone}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {/* View Button */}
              <button
                onClick={() => router.push(`/view?id=${user.id}`)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-400 hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                View
              </button>

              {/* Edit Button */}
              <button
                onClick={() => router.push(`/edit?id=${user.id}`)}
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow-sm hover:bg-yellow-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
