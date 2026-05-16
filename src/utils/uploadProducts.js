import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { products } from "../data/products";

export const uploadProducts = async () => {
    try {
        for (const product of products) {
            await addDoc(collection(db, "products"), product);
            console.log("Uploaded:", product.name);
        }

        console.log("✅ All products uploaded");
    } catch (err) {
        console.error("❌ Upload failed:", err);
    }
};