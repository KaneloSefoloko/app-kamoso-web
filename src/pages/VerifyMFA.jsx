import React, { useState } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function VerifyMFA({ user }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getDatabase();

  async function verifyCode() {
    setError("");
    const codeRef = ref(db, `mfaCodes/${user.uid}`);
    const snap = await get(codeRef);

    if (!snap.exists()) {
      setError("Invalid or expired code.");
      return;
    }

    const data = snap.val();

    if (Date.now() > data.expiresAt) {
      setError("Code expired.");
      return;
    }

    if (code !== data.code) {
      setError("Wrong code.");
      return;
    }

    // Remove used code
    await remove(codeRef);

    navigate("/"); // redirect to home
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Enter MFA Code</h1>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
        className="border w-full p-2 mb-3"
      />
      <button
        onClick={verifyCode}
        className="w-full bg-black text-white py-2 rounded"
      >
        Verify
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
