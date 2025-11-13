import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const products = [
    { id: 1, name: 'Gray Hoodie', price: 799, image: '/assets/person.jpeg', hoverImage:  '/assets/yourself.jpeg'},
    { id: 2, name: 'Black Ratanda T-Shirt', price: 449, image: '/assets/tshirt.jpeg', hoverImage: '/assets/front.jpeg'},
    { id: 3, name: 'Black Rose T-Shirt', price: 449, image: '/assets/front.jpeg', hoverImage: '/assets/tshirt.jpeg'},
    { id: 4, name: 'Black Courage T-Shirt', price: 699, image: '/assets/yourself.jpeg', hoverImage: '/assets/person.jpeg'},
];

const Home = () => (
    <div>
        <Hero />
        <ProductGrid products={products} />
        <Footer />
    </div>
);
export default Home;