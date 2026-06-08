import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <Navbar />

            <main className="max-w-6xl mx-auto p-6">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}