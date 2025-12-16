import React, { useState } from "react";
import {
  multiFactor,
  TotpMultiFactorGenerator
} from "firebase/auth";
import { auth } from "../../firebase";

export default function SetupMFA() {
  const [qrUrl, setQrUrl] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function startSetup() {
    try {
      setError("");

      const mfaUser = multiFactor(auth.currentUser);
      const session = await mfaUser.getSession();

      // Create a TOTP enrollment session
      const { secretKey: key, qrCodeUrl } =
        await TotpMultiFactorGenerator.generateSecret(session);

      setSecretKey(key);
      setQrUrl(qrCodeUrl);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  async function finishEnrollment() {
    try {
      setError("");

      if (!secretKey) {
        setError("TOTP secret not generated.");
        return;
      }

      // Create credential from the secret + user typed code
      const cred = TotpMultiFactorGenerator.credential(secretKey, code);

      const mfaUser = multiFactor(auth.currentUser);
      await mfaUser.enroll(cred, "Authenticator App");

      alert("TOTP MFA enabled!");
    } catch (e) {
      console.error(e);
      setError("Invalid code. Please try again.");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Setup Multi-Factor Authentication</h1>

      {!qrUrl && (
        <button
          onClick={startSetup}
          className="w-full bg-black text-white py-2 rounded"
        >
          Generate QR Code
        </button>
      )}

      {qrUrl && (
        <>
          <p className="mt-4 mb-2">
            Scan this QR code with Google Authenticator, Authy, 1Password, or any TOTP app:
          </p>

          <img
            src={qrUrl}
            alt="TOTP QR Code"
            className="w-56 mx-auto border p-2 mb-4"
          />

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="border w-full p-2 mb-3"
          />

          <button
            onClick={finishEnrollment}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Verify & Enable MFA
          </button>
        </>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
