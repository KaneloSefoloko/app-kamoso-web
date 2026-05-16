import React, { useEffect, useState } from "react";
import { db } from "../../../firebase.js";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const ProductsManager = () => {
    const [products, setProducts] = useState([]);

    // form
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sizes, setSizes] = useState("");
    const [file, setFile] = useState(null);
    const [hoverFile, setHoverFile] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 LIVE DATA
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "products"), snap => {
            setProducts(
                snap.docs.map(d => ({ id: d.id, ...d.data() }))
            );
        });

        return () => unsub();
    }, []);

    // ---------------- ADD / UPDATE ----------------
    const handleSave = async () => {
        if (!name || !price) return alert("Missing fields");

        setLoading(true);

        try {
            let imageUrl = null;
            let hoverUrl = null;

            if (file) imageUrl = await uploadToCloudinary(file);
            if (hoverFile) hoverUrl = await uploadToCloudinary(hoverFile);

            const payload = {
                name,
                price: Number(price),
                slug: name.toLowerCase().replace(/\s+/g, "-"),
                sizes: sizes
                    ? sizes.split(",").map((s) => s.trim())
                    : ["ONE_SIZE"],
                createdAt: serverTimestamp(),
            };

            if (imageUrl) payload.image = imageUrl;
            if (hoverUrl) payload.hoverImage = hoverUrl;

            if (editingId) {
                await updateDoc(doc(db, "products", editingId), payload);
            } else {
                await addDoc(collection(db, "products"), payload);
            }

            resetForm();
        } catch (err) {
            console.error(err);
            alert("Failed");
        }

        setLoading(false);
    };

    // ---------------- DELETE ----------------
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "products", id));
    };

    // ---------------- EDIT ----------------
    const handleEdit = (p) => {
        setEditingId(p.id);
        setName(p.name);
        setPrice(p.price);
        setSizes(p.sizes?.join(",") || "");
    };

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setPrice("");
        setSizes("");
        setFile(null);
        setHoverFile(null);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            {/* FORM */}
            <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    placeholder="Sizes (S,M,L or ONE_SIZE)"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    className="border p-2 w-full"
                />

                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <input type="file" onChange={(e) => setHoverFile(e.target.files[0])} />

                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="bg-black text-white px-4 py-2"
                    >
                        {loading
                            ? "Saving..."
                            : editingId
                                ? "Update Product"
                                : "Add Product"}
                    </button>

                    {editingId && (
                        <button
                            onClick={resetForm}
                            className="border px-4 py-2"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* LIST */}
            <div className="grid md:grid-cols-2 gap-4">
                {products.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded shadow flex gap-4">
                        <img
                            src={p.image}
                            className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1">
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm">R{p.price}</p>
                            <p className="text-xs text-gray-500">
                                {p.sizes?.join(", ")}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => handleEdit(p)}
                                className="text-blue-500 text-sm"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-500 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsManager;