// src/data/products.js

//This is make multi-color selection ************
// const product = {
//     name: "Black Heavy Tee",
//     slug: "black-heavy-tee",
//     price: 499,
//     images: {
//         black: "/assets/product-black.jpg",
//         white: "/assets/product-white.jpg",
//         beige: "/assets/product-beige.jpg",
//     },
//     hoverImages: {
//         black: "/assets/product-black-hover.jpg",
//         white: "/assets/product-white-hover.jpg",
//         beige: "/assets/product-beige-hover.jpg",
//     },
// };

export const products = [
    {
        id: 1,
        slug: 'gray-hoodie',
        name: 'Gray Hoodie',
        price: 799,
        image: '/assets/person.jpeg',
        hoverImage: '/assets/yourself.jpeg',
        gallery: [
            '/assets/person.jpeg',
            '/assets/yourself.jpeg',
            '/assets/front.jpeg', // optional extra
        ],
        description: 'A stylish gray hoodie for everyday wear.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [], // e.g. ['XL']
        color: 'Gray',
        highlights: ['Soft fleece interior', 'Regular fit', 'Kangaroo pocket'],
        care: ['Cold machine wash', 'Do not tumble dry', 'Iron on low'],
        inStock: true,
        related: [
            { slug: 'black-ratanda-t-shirt', name: 'Black Ratanda T-Shirt', price: 449, image: '/assets/tshirt.jpeg' },
            { slug: 'black-courage-t-shirt', name: 'Black Courage T-Shirt', price: 699, image: '/assets/yourself.jpeg' },
        ],
    },
    {
        id: 2,
        slug: 'black-ratanda-t-shirt',
        name: 'Black Ratanda T-Shirt',
        price: 449,
        image: '/assets/tshirt.jpeg',
        hoverImage: '/assets/front.jpeg',
        gallery: [
            '/assets/tshirt.jpeg',
            '/assets/front.jpeg',
            '/assets/person.jpeg',
        ],
        description: 'Comfortable cotton T-shirt with Ratanda design.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: ['XL'], // example: XL currently unavailable
        color: 'Black',
        highlights: ['100% Cotton', 'Regular fit', 'Screen-printed graphic'],
        care: ['Cold wash', 'Do not tumble dry', 'Iron inside-out'],
        inStock: true,
        related: [
            { slug: 'black-rose-t-shirt', name: 'Black Rose T-Shirt', price: 449, image: '/assets/front.jpeg' },
            { slug: 'gray-hoodie', name: 'Gray Hoodie', price: 799, image: '/assets/person.jpeg' },
        ],
    },
    {
        id: 3,
        slug: 'black-rose-t-shirt',
        name: 'Black Rose T-Shirt',
        price: 449,
        image: '/assets/front.jpeg',
        hoverImage: '/assets/tshirt.jpeg',
        gallery: [
            '/assets/front.jpeg',
            '/assets/tshirt.jpeg',
        ],
        description: 'Elegant black T-shirt with rose print.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [],
        color: 'Black',
        highlights: ['Breathable fabric', 'Soft hand-feel', 'Rose graphic print'],
        care: ['Gentle cycle', 'Dry flat', 'Do not bleach'],
        inStock: true,
        related: [
            { slug: 'black-ratanda-t-shirt', name: 'Black Ratanda T-Shirt', price: 449, image: '/assets/tshirt.jpeg' },
            { slug: 'black-courage-t-shirt', name: 'Black Courage T-Shirt', price: 699, image: '/assets/yourself.jpeg' },
        ],
    },
    {
        id: 4,
        slug: 'black-courage-t-shirt',
        name: 'Black Courage T-Shirt',
        price: 699,
        image: '/assets/yourself.jpeg',
        hoverImage: '/assets/person.jpeg',
        gallery: [
            '/assets/yourself.jpeg',
            '/assets/person.jpeg',
        ],
        description: 'Bold design for those who embrace courage.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [],
        color: 'Black',
        highlights: ['Premium cotton blend', 'Relaxed fit', 'Bold front artwork'],
        care: ['Wash cold', 'Line dry', 'Do not iron print'],
        inStock: true,
        related: [
            { slug: 'gray-hoodie', name: 'Gray Hoodie', price: 799, image: '/assets/person.jpeg' },
            { slug: 'black-rose-t-shirt', name: 'Black Rose T-Shirt', price: 449, image: '/assets/front.jpeg' },
        ],
    },
];

// Optional helpers
export const getProductBySlug = (slug) => products.find(p => p.slug === slug);
export const getRelatedProducts = (product) =>
    (product?.related || [])
        .map(r => products.find(p => p.slug === r.slug))
        .filter(Boolean);