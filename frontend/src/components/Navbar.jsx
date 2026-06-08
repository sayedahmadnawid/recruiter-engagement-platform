import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="max-w-6xl mx-auto p-4 flex gap-6">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    );
}