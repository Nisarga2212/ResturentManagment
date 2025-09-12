// import { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import {
//     collection,
//     addDoc,
//     getDocs,
//     doc,
//     updateDoc,
//     setDoc,
// } from "firebase/firestore";
// import AdminLayout from "./AdminLayout";

// function PurchaseLogs() {
//     const [logs, setLogs] = useState([]);
//     const [suppliers, setSuppliers] = useState([]);
//     const [items, setItems] = useState([]);
//     const [newLog, setNewLog] = useState({
//         item: "",
//         type: "purchase",
//         quantity: 0,
//         supplier: "",
//     });

//     function formatDate(isoString) {
//         const date = new Date(isoString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
//         const day = String(date.getDate()).padStart(2, "0");
//         return `${year}-${month}-${day}`;
//     }

//     useEffect(() => {
//         fetchLogs();
//         fetchSuppliers();
//         fetchItems();
//     }, []);

//     const fetchLogs = async () => {
//         const snapshot = await getDocs(collection(db, "logs"));
//         setLogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     };

//     const fetchSuppliers = async () => {
//         const snapshot = await getDocs(collection(db, "suppliers"));
//         setSuppliers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     };

//     const fetchItems = async () => {
//         const snapshot = await getDocs(collection(db, "stock"));
//         setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     };

//     const handleItemChange = (e) => {
//         const selectedItem = e.target.value;
//         setNewLog({ ...newLog, item: selectedItem });

//         // If "Add New Item" selected
//         if (selectedItem === "new") {
//             const itemName = prompt("Enter new item name:");
//             if (itemName) {
//                 const newItemRef = doc(collection(db, "stock"));
//                 setDoc(newItemRef, { name: itemName, quantity: 0 });
//                 fetchItems(); // refresh items
//                 setNewLog({ ...newLog, item: newItemRef.id }); // set to new item's ID
//             } else {
//                 setNewLog({ ...newLog, item: "" }); // reset if no name given
//             }
//         }
//     }

//     const addLog = async () => {
//         let itemId = newLog.item;


//         // Update stock quantity
//         if (itemId) {
//             const stockItem = items.find((i) => i.id === itemId);
//             if (stockItem) {
//                 const updatedQty =
//                     newLog.type === "purchase"
//                         ? stockItem.quantity + newLog.quantity
//                         : stockItem.quantity - newLog.quantity;

//                 await updateDoc(doc(db, "stock", itemId), { quantity: updatedQty });
//             }
//         }

//         // Add log entry
//         await addDoc(collection(db, "logs"), {
//             ...newLog,
//             item: itemId,
//             date: new Date().toISOString(),
//         });

//         // Reset form
//         setNewLog({ item: "", type: "purchase", quantity: 0, supplier: "" });
//         fetchLogs();
//     };

//     return (
//         <AdminLayout>
//             <h2 className="text-2xl font-bold mb-4">Purchase & Usage Logs</h2>

//             <div className="mb-4 flex gap-2 flex-wrap">
//                 {/* Item Dropdown */}
//                 <select
//                     className="border p-2"
//                     value={newLog.item}
//                     onChange={(e) => handleItemChange(e)}
//                 >
//                     <option value="">Select Item</option>
//                     <option value="new">➕ Add New Item</option>
//                     {items.map((item) => (
//                         <option key={item.id} value={item.id}>
//                             {item.name}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Type Selector */}
//                 <select
//                     className="border p-2"
//                     value={newLog.type}
//                     onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
//                 >
//                     <option value="purchase">Purchase</option>
//                     <option value="usage">Usage</option>
//                 </select>

//                 {/* Supplier Dropdown (only if purchase) */}
//                 {newLog.type === "purchase" && (
//                     <select
//                         className="border p-2"
//                         value={newLog.supplier}
//                         onChange={(e) => setNewLog({ ...newLog, supplier: e.target.value })}
//                     >
//                         <option value="">Select Supplier</option>
//                         {suppliers.map((s) => (
//                             <option key={s.id} value={s.name}>
//                                 {s.name}
//                             </option>
//                         ))}
//                     </select>
//                 )}

//                 {/* Quantity Input */}
//                 <input
//                     type="number"
//                     placeholder="Quantity"
//                     className="border p-2"
//                     value={newLog.quantity}
//                     onChange={(e) =>
//                         setNewLog({ ...newLog, quantity: Number(e.target.value) })
//                     }
//                 />

//                 {/* Add Button */}
//                 <button
//                     onClick={addLog}
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                     Add Log
//                 </button>
//             </div>

//             {/* Logs List */}
//             <table className="min-w-full border border-gray-300 text-sm">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border px-4 py-2 text-left">Date</th>
//                         <th className="border px-4 py-2 text-left">Item</th>
//                         <th className="border px-4 py-2 text-left">Type</th>
//                         <th className="border px-4 py-2 text-left">Quantity</th>
//                         <th className="border px-4 py-2 text-left">Supplier</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logs.map((log) => {
//                         const itemName = items.find((i) => i.id === log.item)?.name || log.item;
//                         return (
//                             <tr key={log.id} className="hover:bg-gray-50">
//                                 <td className="border px-4 py-2">
//                                     {log.date?.toDate
//                                         ? formatDate(log.date.toDate().toLocaleString()) // Firestore Timestamp
//                                         : formatDate(log.date)}
//                                 </td>
//                                 <td className="border px-4 py-2">{itemName}</td>
//                                 <td className="border px-4 py-2 capitalize">{log.type}</td>
//                                 <td className="border px-4 py-2">{log.quantity}</td>
//                                 <td className="border px-4 py-2">
//                                     {log.type === "purchase" ? log.supplier || "-" : "-"}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//         </AdminLayout>
//     );
// }

// export default PurchaseLogs;


import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    setDoc,
} from "firebase/firestore";
import AdminLayout from "./AdminLayout";

function PurchaseLogs() {
    const [logs, setLogs] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [items, setItems] = useState([]);
    const [newLog, setNewLog] = useState({
        item: "",
        type: "purchase",
        quantity: 0,
        supplier: "",
    });

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        fetchLogs();
        fetchSuppliers();
        fetchItems();
    }, []);

    const fetchLogs = async () => {
        const snapshot = await getDocs(collection(db, "logs"));
        setLogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchSuppliers = async () => {
        const snapshot = await getDocs(collection(db, "suppliers"));
        setSuppliers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchItems = async () => {
        const snapshot = await getDocs(collection(db, "stock"));
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const handleItemChange = (e) => {
        const selectedItem = e.target.value;
        setNewLog({ ...newLog, item: selectedItem });

        if (selectedItem === "new") {
            const itemName = prompt("Enter new item name:");
            if (itemName) {
                const newItemRef = doc(collection(db, "stock"));
                setDoc(newItemRef, { name: itemName, quantity: 0 });
                fetchItems();
                setNewLog({ ...newLog, item: newItemRef.id });
            } else {
                setNewLog({ ...newLog, item: "" });
            }
        }
    };

    const addLog = async () => {
        let itemId = newLog.item;

        if (itemId) {
            const stockItem = items.find((i) => i.id === itemId);
            if (stockItem) {
                const updatedQty =
                    newLog.type === "purchase"
                        ? stockItem.quantity + newLog.quantity
                        : stockItem.quantity - newLog.quantity;

                await updateDoc(doc(db, "stock", itemId), { quantity: updatedQty });
            }
        }

        await addDoc(collection(db, "logs"), {
            ...newLog,
            item: itemId,
            date: new Date().toISOString(),
        });

        setNewLog({ item: "", type: "purchase", quantity: 0, supplier: "" });
        fetchLogs();
    };

    return (
        <AdminLayout>
            {/* Animated gradient background */}
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 animate-gradient bg-[length:400%_400%] p-8">
                <h2 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
                    Purchase & Usage Logs
                </h2>

                {/* Form Card */}
                <div className="mb-6 p-6 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 animate-slide-up">
                    <div className="flex flex-wrap gap-3">
                        <select
                            className="border rounded-lg p-2 bg-white/80"
                            value={newLog.item}
                            onChange={(e) => handleItemChange(e)}
                        >
                            <option value="">Select Item</option>
                            <option value="new">➕ Add New Item</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border rounded-lg p-2 bg-white/80"
                            value={newLog.type}
                            onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
                        >
                            <option value="purchase">Purchase</option>
                            <option value="usage">Usage</option>
                        </select>

                        {newLog.type === "purchase" && (
                            <select
                                className="border rounded-lg p-2 bg-white/80"
                                value={newLog.supplier}
                                onChange={(e) => setNewLog({ ...newLog, supplier: e.target.value })}
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((s) => (
                                    <option key={s.id} value={s.name}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input
                            type="number"
                            placeholder="Quantity"
                            className="border rounded-lg p-2 bg-white/80"
                            value={newLog.quantity}
                            onChange={(e) =>
                                setNewLog({ ...newLog, quantity: Number(e.target.value) })
                            }
                        />

                        <button
                            onClick={addLog}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                            Add Log
                        </button>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="overflow-x-auto rounded-xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/30 animate-fade-in">
                    <table className="min-w-full text-sm text-white">
                        <thead className="bg-white/20">
                            <tr>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Item</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Quantity</th>
                                <th className="px-4 py-3 text-left">Supplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => {
                                const itemName =
                                    items.find((i) => i.id === log.item)?.name || log.item;
                                return (
                                    <tr
                                        key={log.id}
                                        className={`hover:bg-white/10 transition-colors ${
                                            index % 2 === 0 ? "bg-white/5" : "bg-white/0"
                                        }`}
                                    >
                                        <td className="px-4 py-2">
                                            {log.date?.toDate
                                                ? formatDate(log.date.toDate().toLocaleString())
                                                : formatDate(log.date)}
                                        </td>
                                        <td className="px-4 py-2">{itemName}</td>
                                        <td className="px-4 py-2 capitalize">{log.type}</td>
                                        <td className="px-4 py-2">{log.quantity}</td>
                                        <td className="px-4 py-2">
                                            {log.type === "purchase" ? log.supplier || "-" : "-"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default PurchaseLogs;

/* Extra Tailwind animations (add in globals.css or tailwind config if not present):
@keyframes gradient {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
.animate-gradient {
  animation: gradient 12s ease infinite;
}
.animate-fade-in {
  animation: fadeIn 1.2s ease forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 1s ease forwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
*/
