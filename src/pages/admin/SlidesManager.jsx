import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { uploadToCloudinary } from "../../cloudinaryUpload";

const SlidesManager = () => {
    const [slides, setSlides] = useState([]);
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState("");
    const [link, setLink] = useState("");
    const [device, setDevice] = useState("web");
    const [loading, setLoading] = useState(false);

    const fetchSlides = async () => {
        const snap = await getDocs(collection(db, "slides"));
        setSlides(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        try {
            const url = await uploadToCloudinary(file);

            await addDoc(collection(db, "slides"), {
                src: url,
                label,
                link,
                device,
                active: true,
                order: Date.now(),
            });

            setFile(null);
            setLabel("");
            setLink("");

            fetchSlides();
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "slides", id));
        fetchSlides();
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Hero Slides</h1>

            <div className="space-y-2 border p-4 rounded">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <input
                    placeholder="Label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full border p-2"
                />

                <input
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full border p-2"
                />

                <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full border p-2"
                >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                </select>

                <button
                    onClick={handleUpload}
                    className="bg-black text-white px-4 py-2 w-full"
                >
                    {loading ? "Uploading..." : "Add Slide"}
                </button>
            </div>

            <div className="mt-6 space-y-3">
                {slides.map((s) => (
                    <div key={s.id} className="flex justify-between border p-2">
                        <div>
                            <p>{s.label}</p>
                            <p className="text-xs text-gray-500">{s.device}</p>
                        </div>

                        <button
                            onClick={() => handleDelete(s.id)}
                            className="text-red-500"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlidesManager;