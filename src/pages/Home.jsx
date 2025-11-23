import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products } from '../data/products';

const Home = () => (
    <div>
        <Hero />
        <ProductGrid products={products} />
        <Footer />
    </div>
);

export default Home;