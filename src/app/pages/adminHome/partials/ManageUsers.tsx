import { useState, useEffect } from 'react';
import {type ChangeEvent, type FormEvent } from 'react';
import { register, searchAccounts, deleteAccount, getAllAccounts } from '../services/accountService';
import { FiTrash2 } from 'react-icons/fi';
import type { Account, NewUser } from '../models/UserModel';

export default function ManageUsers() {
  const [query, setQuery] = useState<string>('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<NewUser>({
    userName: '',
    email: '',
    phone: '',
    password: '',
    fullName: '',
    address: '',
    role: 'ADMIN',
  });
  const [adding, setAdding] = useState<boolean>(false);
  const [addError, setAddError] = useState<string>('');

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const res = await getAllAccounts({ page: 0, size: 50 });
      setAccounts(res.data.listData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchAccounts({ name: query, page: 0, size: 50 });
      setAccounts(res.data.listData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa?')) return;
    try {
      await deleteAccount(id);
      await loadAccounts();
    } catch {
      alert('Xóa thất bại');
    }
  };

  const handleNewUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser((u) => ({ ...u, [id]: value }));
  };

  const handleAddSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdding(true);
    setAddError('');
    try {
      await register(newUser);
      setShowAddModal(false);
      setNewUser({
        userName: '',
        email: '',
        phone: '',
        password: '',
        fullName: '',
        address: '',
        role: 'USER',
      });
      await loadAccounts();
    } catch (err: any) {
      console.error(err);
      setAddError(err.response?.data?.message || 'Thêm user thất bại');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">Loading…</td>
              </tr>
            ) : accounts.length > 0 ? (
              accounts.map((acct, i) => (
                <tr key={acct.uuid} className="border-t">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{acct.userName}</td>
                  <td className="px-4 py-2">{acct.email}</td>
                  <td className="px-4 py-2">{acct.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(acct.uuid)}
                      className="p-2 hover:text-red-600 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">Không có user nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Add New User
      </button>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-semibold">Add New User</h2>
            {addError && <p className="text-red-600">{addError}</p>}
            <form onSubmit={handleAddSubmit} className="space-y-3">
              {[
                { id: 'userName', label: 'Username', type: 'text', required: true },
                { id: 'email', label: 'Email', type: 'email' },
                { id: 'phone', label: 'Phone', type: 'text' },
                { id: 'fullName', label: 'Full Name', type: 'text', required: true },
                { id: 'address', label: 'Address', type: 'text', required: true },
                { id: 'password', label: 'Password', type: 'password' },
                { id: 'role', label: 'Role', type: 'text' },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block mb-1 font-medium">
                    {field.label}
                    {field.required ? '*' : ''}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required={field.required}
                    value={(newUser as any)[field.id]}
                    onChange={handleNewUserChange}
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  disabled={adding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  disabled={adding}
                >
                  {adding ? 'Adding…' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
