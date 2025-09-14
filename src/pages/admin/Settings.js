
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import AdminLayout from "./AdminLayout";
import { Pencil, Check, X } from "lucide-react";

function Settings() {
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserData({ id: user.uid, email: user.email, ...snap.data() });
        }
      }
    };
    fetchUser();
  }, [user]);

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue || "");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
    setNewPassword("");
  };

  const saveEdit = async () => {
    if (!user) return;

    try {
      if (editingField === "username") {
        await updateDoc(doc(db, "users", user.uid), { username: editValue });
        setUserData((prev) => ({ ...prev, username: editValue }));
      }

      if (editingField === "password" && newPassword.trim()) {
        await updatePassword(user, newPassword);
        alert("Password updated successfully!");
      }
    } catch (error) {
      alert(error.message);
    }

    cancelEdit();
  };

  if (!userData) {
    return (
      <AdminLayout>
        <h2 className="text-xl font-bold">Loading user data...</h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="text-3xl font-semibold mb-6">⚙️ Account Settings</h2>

      <div className="overflow-hidden rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Field</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {/* Email (non-editable) */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Email</td>
              <td className="px-6 py-4">{userData.email}</td>
              <td className="px-6 py-4 text-center text-gray-400">—</td>
            </tr>

            {/* Username */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Username</td>
              <td className="px-6 py-4">
                {editingField === "username" ? (
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  userData.username || "-"
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {editingField === "username" ? (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={saveEdit}
                      className="p-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit("username", userData.username)}
                    className="p-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </td>
            </tr>

            {/* Role (non-editable) */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Role</td>
              <td className="px-6 py-4">{userData.role}</td>
              <td className="px-6 py-4 text-center text-gray-400">—</td>
            </tr>

            {/* Password */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Password</td>
              <td className="px-6 py-4">
                {editingField === "password" ? (
                  <input
                    type="password"
                    className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                ) : (
                  "••••••••"
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {editingField === "password" ? (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={saveEdit}
                      className="p-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingField("password")}
                    className="p-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Settings;
