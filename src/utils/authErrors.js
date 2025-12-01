export function getFriendlyAuthMessage(code, context = "login") {
    const common = {
        "auth/invalid-credential": context === "pin"
            ? "The PIN you entered is incorrect. Please try again."
            : "Incorrect email or password. Please try again.",
        "auth/invalid-email": "That email doesn't look right. Please check and try again.",
        "auth/user-disabled": "This account has been disabled. Please contact support.",
        "auth/user-not-found": "We couldn't find an account with that email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
        "auth/network-request-failed": "Network issue. Check your connection and try again.",
        "auth/internal-error": "Something went wrong. Please try again.",
    };

    return common[code] || "Sign-in failed. Please try again.";
}
