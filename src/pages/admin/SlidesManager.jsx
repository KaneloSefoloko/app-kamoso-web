import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

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
        if (!file) return alert("Select an image");

        setLoading(true);

        try {
            const imageUrl = await uploadToCloudinary(file);

            await addDoc(collection(db, "slides"), {
                src: imageUrl,
                label,
                link,
                device,
                type: "image",
                createdAt: new Date(),
            });

            setFile(null);
            setLabel("");
            setLink("");
            fetchSlides();
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "slides", id));
        fetchSlides();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Slides Manager</h1>

            {/* UPLOAD FORM */}
            <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <input
                    placeholder="Label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="border p-2 w-full"
                />

                <input
                    placeholder="Link (e.g. /category/sunglasses)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border p-2 w-full"
                />

                <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                </select>

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2"
                >
                    {loading ? "Uploading..." : "Upload Slide"}
                </button>
            </div>

            {/* LIST */}
            <div className="grid md:grid-cols-2 gap-4">
                {slides.map((s) => (
                    <div key={s.id} className="border p-3">
                        <img src={s.src} className="h-40 object-cover w-full mb-2" />
                        <p className="font-semibold">{s.label}</p>
                        <p className="text-sm text-gray-500">{s.device}</p>

                        <button
                            onClick={() => handleDelete(s.id)}
                            className="text-red-500 mt-2"
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