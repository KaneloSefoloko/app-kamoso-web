import React, { useState, useEffect } from "react";
import { uploadToCloudinary } from "./cloudinaryUpload";
import { saveSlideToFirestore, getSlides, deleteSlide } from "./firestoreUtils";

const AdminUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [type, setType] = useState("image");
    const [label, setLabel] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [slides, setSlides] = useState([]);

    // Fetch existing slides
    useEffect(() => {
        const fetchSlides = async () => {
            const data = await getSlides();
            setSlides(data);
        };
        fetchSlides();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file || !label || !link) {
            setMessage("Please fill all fields and select a file.");
            return;
        }

        setLoading(true);
        try {
            const cloudinaryUrl = await uploadToCloudinary(file);
            await saveSlideToFirestore({ label, link, src: cloudinaryUrl, type });

            setMessage("Slide uploaded successfully!");
            setFile(null);
            setPreview(null);
            setLabel("");
            setLink("");

            const updatedSlides = await getSlides();
            setSlides(updatedSlides);
        } catch (error) {
            console.error(error);
            setMessage("Upload failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await deleteSlide(id);
        const updatedSlides = await getSlides();
        setSlides(updatedSlides);
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Upload New Slide</h2>

            <input type="file" onChange={handleFileChange} className="mb-4" />

            {preview && (
                <div className="mb-4">
                    {type === "image" ? (
                        <img src={preview} alt="Preview" className="w-full h-auto rounded-md" />
                    ) : (
                        <video src={preview} controls className="w-full rounded-md" />
                    )}
                </div>
            )}

            <select value={type} onChange={(e) => setType(e.target.value)} className="mb-4 w-full border p-2">
                <option value="image">Image</option>
                <option value="video">Video</option>
            </select>

            <input
                type="text"
                placeholder="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="mb-4 w-full border p-2"
            />

            <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="mb-4 w-full border p-2"
            />

            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
                {loading ? "Uploading..." : "Upload Slide"}
            </button>

            {message && <p className="mt-4 text-green-600">{message}</p>}

            <hr className="my-6" />

            <h3 className="text-lg font-semibold mb-4">Existing Slides</h3>
            <div className="space-y-4">
                {slides.map((slide) => (
                    <div key={slide.id} className="flex items-center justify-between border p-2 rounded">
                        <div className="flex items-center gap-4">
                            {slide.type === "image" ? (
                                <img src={slide.src} alt={slide.label} className="w-16 h-16 object-cover rounded" />
                            ) : (
                                <video src={slide.src} className="w-16 h-16 rounded" />
                            )}
                            <div>
                                <p className="font-bold">{slide.label}</p>
                                <p className="text-sm text-gray-500">{slide.link}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(slide.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUpload;