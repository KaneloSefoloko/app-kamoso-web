import Navbar from './components/Navbar';
import PaymentMethods from './components/PaymentMethod';
import Home from './pages/Home';

const App = () => (
    <div>
        <PaymentMethods />
        <Navbar/>
        <Home/>
        {/* Floating Chat Button */}
        <button
            className="fixed bottom-6 right-6 z-50 bg-white text-black w-16 h-16 rounded-full
            shadow-md hover:bg-gray-200 transition text-xl flex items-center justify-center">
            💬
        </button>
    </div>
);
export default App;
