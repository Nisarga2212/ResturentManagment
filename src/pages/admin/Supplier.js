// // src/pages/admin/Suppliers.js
// import { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import AdminLayout from "./AdminLayout";

// function Suppliers() {
//     const [suppliers, setSuppliers] = useState([]);
//     const [newSupplier, setNewSupplier] = useState({ name: "", contact: "" });

//     useEffect(() => {
//         fetchSuppliers();
//     }, []);

//     const fetchSuppliers = async () => {
//         const snapshot = await getDocs(collection(db, "suppliers"));
//         setSuppliers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     };

//     const addSupplier = async () => {
//         await addDoc(collection(db, "suppliers"), newSupplier);
//         setNewSupplier({ name: "", contact: "" });
//         fetchSuppliers();
//     };

//     return (
//         <AdminLayout>
//             <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
//             <div className="mb-4 flex gap-2">
//                 <input
//                     type="text"
//                     placeholder="Supplier name"
//                     className="border p-2"
//                     value={newSupplier.name}
//                     onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Contact info"
//                     className="border p-2"
//                     value={newSupplier.contact}
//                     onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
//                 />
//                 <button onClick={addSupplier} className="bg-blue-600 text-white px-4 py-2 rounded">
//                     Add
//                 </button>
//             </div>
//             <table className="min-w-full border border-gray-300 text-sm">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border px-4 py-2 text-left">Supplier Name</th>
//                         <th className="border px-4 py-2 text-left">Contact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {suppliers.map((s) => (
//                         <tr key={s.id} className="hover:bg-gray-50">
//                             <td className="border px-4 py-2">{s.name}</td>
//                             <td className="border px-4 py-2">{s.contact || "-"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//         </AdminLayout>
//     );
// }

// export default Suppliers;


// src/pages/admin/Suppliers.js
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import AdminLayout from "./AdminLayout";
import { Pencil, Trash2, Check, X } from "lucide-react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: "", contact: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", contact: "" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const snapshot = await getDocs(collection(db, "suppliers"));
    setSuppliers(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const addSupplier = async () => {
    if (!newSupplier.name.trim()) return;
    await addDoc(collection(db, "suppliers"), newSupplier);
    setNewSupplier({ name: "", contact: "" });
    fetchSuppliers();
  };

  const deleteSupplier = async (id) => {
    await deleteDoc(doc(db, "suppliers", id));
    fetchSuppliers();
  };

  const startEdit = (supplier) => {
    setEditingId(supplier.id);
    setEditData({ name: supplier.name, contact: supplier.contact });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "", contact: "" });
  };

  const saveEdit = async (id) => {
    if (!editData.name.trim()) return;
    await updateDoc(doc(db, "suppliers", id), editData);
    setEditingId(null);
    setEditData({ name: "", contact: "" });
    fetchSuppliers();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Supplier name"
          className="border p-2"
          value={newSupplier.name}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Contact info"
          className="border p-2"
          value={newSupplier.contact}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, contact: e.target.value })
          }
        />
        <button
          onClick={addSupplier}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Supplier Name</th>
            <th className="border px-4 py-2 text-left">Contact</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">
                {editingId === s.id ? (
                  <input
                    type="text"
                    className="border p-1 w-full"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                ) : (
                  s.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === s.id ? (
                  <input
                    type="text"
                    className="border p-1 w-full"
                    value={editData.contact}
                    onChange={(e) =>
                      setEditData({ ...editData, contact: e.target.value })
                    }
                  />
                ) : (
                  s.contact || "-"
                )}
              </td>
              <td className="border px-4 py-2 text-center flex gap-2 justify-center">
                {editingId === s.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(s.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(s)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteSupplier(s.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default Suppliers;
