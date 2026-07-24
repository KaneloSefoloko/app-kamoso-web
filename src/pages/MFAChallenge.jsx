import React, { useState } from "react";
import { TotpMultiFactorGenerator } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function MFAChallenge() {
  const location = useLocation();
  const navigate = useNavigate();

  // Firebase's MultiFactorResolver object sent from Login page
  const resolver = location.state?.resolver;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!resolver) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Invalid Challenge</h1>
        <p>No MFA challenge data found.</p>
      </div>
    );
  }

  async function verify() {
    try {
      setError("");

      const cred = TotpMultiFactorGenerator.credential(
        // This is the TOTP secret enrollment ID
        resolver.hints[0].uid,
        code
      );
        await resolver.resolveSignIn(cred);
// Success → go to dashboard or orders page
      navigate("/orders?locale=en&region_country=ZA", { replace: true });

    } catch (e) {
      console.error(e);
      setError("Invalid code. Please try again.");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Enter Verification Code</h1>

      <p className="text-gray-700 mb-4">
        Enter the 6-digit code from your authenticator app.
      </p>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
        placeholder="123456"
        className="border w-full p-2 mb-3 text-center tracking-widest text-xl"
      />

      <button
        onClick={verify}
        className="w-full bg-black text-white py-2 rounded"
      >
        Verify Login
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
