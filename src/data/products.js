export const products = [
    {
        id: 1,
        slug: 'simply-sweater',
        category: 'sweaters-&-hoodies',   // ← add this
        name: 'Simply sweater',
        price: 799,
        image: '/assets/simply-sweater.jpeg',
        hoverImage: '/assets/Positive.svg',
        gallery: [
            '/assets/simply-sweater.jpeg',
            '/assets/Positive.svg'
        ],
        description: 'A stylish sweater for everyday wear.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [],
        color: 'Black',
        highlights: ['Soft fleece interior', 'Regular fit', 'Kangaroo pocket'],
        care: ['Cold machine wash', 'Do not tumble dry', 'Iron on low'],
        inStock: true,
        related: [
            { slug: 'black-ratanda-t-shirt', name: 'Ratanda T-Shirt', price: 449, image: '/assets/tshirt.jpeg' },
            { slug: 'black-courage-t-shirt', name: 'Courage T-Shirt', price: 499, image: '/assets/yourself.jpeg' },
        ],
        createdAt: "2025-12-10"
    },
    {
        id: 2,
        slug: 'black-ratanda-t-shirt',
        category: 't-shirts',  // ← add this
        name: 'Ratanda T-Shirt',
        price: 449,
        image: '/assets/stay-alert.jpeg',
        hoverImage: '/assets/back.jpeg',
        gallery: [
            '/assets/tshirt.jpeg',
            '/assets/front.jpeg',
            '/assets/kav-tee.jpeg',
            '/assets/stay-alert.jpeg'
        ],
        description: 'Comfortable cotton T-shirt with Ratanda design.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: ['XL'],
        color: 'White',
        highlights: ['100% Cotton', 'Regular fit', 'Screen-printed graphic'],
        care: ['Cold wash', 'Do not tumble dry', 'Iron inside-out'],
        inStock: true,
        related: [
            { slug: 'black-rose-t-shirt', name: 'Rose T-Shirt', price: 449, image: '/assets/front.jpeg' },
            { slug: 'simply-sweater', name: 'Simply sweater', price: 799, image: '/assets/simply-sweater.jpeg' },
        ],
        createdAt: "2025-12-10"
    },
    {
        id: 3,
        slug: 'black-rose-t-shirt',
        category: 't-shirts',   // ← and this
        name: 'Rose T-Shirt',
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
            { slug: 'black-ratanda-t-shirt', name: 'Ratanda T-Shirt', price: 449, image: '/assets/tshirt.jpeg' },
            { slug: 'black-courage-t-shirt', name: 'Courage T-Shirt', price: 499, image: '/assets/yourself.jpeg' },
        ],
        createdAt: "2025-11-10"
    },
    {
        id: 4,
        slug: 'black-encore-t-shirt',
        category: 't-shirts',   // ← and this
        name: 'Encore T-Shirt',
        price: 499,
        image: '/assets/design.svg',
        hoverImage: '/assets/back.jpeg',
        gallery: [
            '/assets/design.svg',
            '/assets/back.jpeg'
        ],
        description: 'Bold design for those who embrace courage.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [],
        color: 'Black',
        highlights: ['Premium cotton blend', 'Relaxed fit', 'Bold front artwork'],
        care: ['Wash cold', 'Line dry', 'Do not iron print'],
        inStock: true,
        related: [
            { slug: 'black-courage-t-shirt', name: 'Courage T-Shirt', price: 449, image: '/assets/yourself.jpeg' },
            { slug: 'black-rose-t-shirt', name: 'Rose T-Shirt', price: 449, image: '/assets/front.jpeg' },
        ],
        createdAt: "2025-12-10"
    },
    {
        id: 5,
        slug: 'black-courage-t-shirt',
        category: 't-shirts',   // ← and this
        name: 'Courage T-Shirt',
        price: 449,
        image: '/assets/yourself.jpeg',
        hoverImage: '/assets/front.jpeg',
        gallery: [
            '/assets/yourself.svg',
            '/assets/front.jpeg'
        ],
        description: 'Bold design for those who embrace courage.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [],
        color: 'Black',
        highlights: ['Premium cotton blend', 'Relaxed fit', 'Bold front artwork'],
        care: ['Wash cold', 'Line dry', 'Do not iron print'],
        inStock: true,
        related: [
            { slug: 'black-encore-t-shirt', name: 'Encore T-Shirt', price: 499, image: '/assets/design.svg' },
            { slug: 'black-rose-t-shirt', name: 'Rose T-Shirt', price: 449, image: '/assets/front.jpeg' },
        ],
        createdAt: "2025-11-10"
    },
    {
        id: 6,
        slug: 'kav-t-shirt',
        category: 't-shirts',   // ← and this
        name: 'Kavanti T-Shirt',
        price: 449,
        image: '/assets/kav-tee.jpeg',
        hoverImage: '/assets/back.jpeg',
        gallery: [
            '/assets/kav-tee.jpeg',
            '/assets/back.jpeg'
        ],
        description: 'Bold design for those who embrace courage.',
        sizes: ['S', 'M', 'L', 'XL'],
        unavailableSizes: [],
        color: 'White',
        highlights: ['Premium cotton blend', 'Relaxed fit', 'Bold front artwork'],
        care: ['Wash cold', 'Line dry', 'Do not iron print'],
        inStock: true,
        related: [
            { slug: 'black-encore-t-shirt', name: 'Encore T-Shirt', price: 499, image: '/assets/design.svg' },
            { slug: 'black-rose-t-shirt', name: 'Rose T-Shirt', price: 449, image: '/assets/front.jpeg' },
        ],
        createdAt: "2025-11-10"
    },
    {
        id: 7,
        slug: 'blue-shades',
        category: 'sunglasses',   // ← and this
        name: 'Classic Green Shades',
        price: 250,
        image: '/assets/greenage-shades.jpeg',
        hoverImage: '/assets/greenage-shades.jpeg',
        gallery: [
            '/assets/greenage-shades.jpeg',
            '/assets/greenage-shades.jpeg'
        ],
        description: 'Bold design for those who embrace courage.',
        sizes: ['One size'],
        unavailableSizes: [],
        color: 'White',
        highlights: ['Premium shades', 'Sees the future', 'One size fits all'],
        care: ["Use recommended soft cloth to wipe or clean"],
        inStock: true,
        related: [
            { slug: 'black-rounded-shades', name: 'Rounded Shades', price: 420, image: '/assets/rounded-shape.jpeg' },
            { slug: 'goldish-shades', name: 'Goldish Shades', price: 420, image: '/assets/goldish-shades.jpeg' }
        ],
        createdAt: "2025-04-11"
    }
];

