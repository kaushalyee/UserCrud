"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/userSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function ViewUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector(state => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div className="max-w-2xl mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <p>User not found</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Details</h1>

      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Name
          </label>
          <p className="text-lg">{selectedUser.name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Email
          </label>
          <p className="text-lg">{selectedUser.email}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Phone
          </label>
          <p className="text-lg">{selectedUser.phone}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            onClick={() => router.push(`/edit?id=${selectedUser.id}`)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
}