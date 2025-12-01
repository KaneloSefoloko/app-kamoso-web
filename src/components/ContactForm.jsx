import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase.js";

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                createdAt: Timestamp.now()
            });
            setStatus('Message sent! Thank you.');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('Error sending message. Try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded h-32"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
                >
                    Send
                </button>
            </form>
            {status && <p className="mt-4 text-center">{status}</p>}
        </div>
    );
};

export default ContactForm;
