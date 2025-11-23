import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase.js";

export const saveSlideToFirestore = async (slide) => {
    await addDoc(collection(db, "slides"), {
        label: slide.label,
        link: slide.link,
        src: slide.src,
        type: slide.type
    });
};

export const getSlides = async () => {
    const querySnapshot = await getDocs(collection(db, "slides"));
    return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const deleteSlide = async (id) => {
    await deleteDoc(doc(db, "slides", id));
};