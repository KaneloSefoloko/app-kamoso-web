import React, { useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import ScrollDivider from "../components/ScrollDivider";

/* ---------------- CLEAN SECTION ---------------- */
const ProductSection = ({ title, products, innerRef }) => {
    return (
        <section ref={innerRef} className="py-16 md:py-24 px-4 md:px-10">
            <h2 className="text-xl md:text-3xl font-light tracking-[0.2em] uppercase mb-10 text-center">
                {title}
            </h2>

            <ProductGrid products={products} limit={4} />
        </section>
    );
};

/* ---------------- NORMALISE ---------------- */
const normalize = (str) =>
    str
        ?.toLowerCase()
        .replace(/&/g, "and")       // safer than "-"
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")       // removes double/triple dashes
        .trim();

const Home = () => {
    const [products, setProducts] = useState([]);

    const tshirtRef = useRef(null);
    const hoodieRef = useRef(null);
    const shadesRef = useRef(null);

    /* ---------------- FETCH DB PRODUCTS ---------------- */
    useEffect(() => {
        const fetchProducts = async () => {
            const snap = await getDocs(collection(db, "products"));
            const data = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));
            setProducts(data);
        };

        fetchProducts();
    }, []);

    /* ---------------- GROUPS ---------------- */
    const tShirts = useMemo(
        () => products.filter((p) => normalize(p.category) === "t-shirts"),
        [products]
    );

    const hoodies = useMemo(
        () =>
            products.filter(
                (p) => normalize(p.category) === "sweaters-and-hoodies"
            ),
        [products]
    );

    const shades = useMemo(
        () => products.filter((p) => normalize(p.category) === "sunglasses"),
        [products]
    );

    return (
        <div className="bg-white text-black">

            {/* HERO */}
            <Hero />

            {/* T-SHIRTS */}
            <ProductSection
                innerRef={tshirtRef}
                title="T-Shirts"
                products={tShirts}
            />

            {/* SCROLL BUTTON */}
            <ScrollDivider
                targetRef={hoodieRef}
                label="Hoodies"
            />

            {/* HOODIES */}
            <ProductSection
                innerRef={hoodieRef}
                title="Hoodies & Sweaters"
                products={hoodies}
            />

            {/* SCROLL BUTTON */}
            <ScrollDivider
                targetRef={shadesRef}
                label="Shades"
            />

            {/* SUNGLASSES */}
            <ProductSection
                innerRef={shadesRef}
                title="Sunglasses"
                products={shades}
            />

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Home;