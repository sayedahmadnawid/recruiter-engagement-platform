import { Link } from 'react-router-dom';
export default function HeroSection() {
    return (
        
        <section className="max-w-4xl py-10 mx-auto p-6">
            
            <div className="max-w-4xl">
                <p className="text-lg text-gray-600">
                    Full Stack Developer
                </p>

                <h1 className="text-5xl font-bold mt-4">
                    Sayed Ahmad Nawid
                </h1>

                <p className="mt-6 text-xl text-gray-700">
                    Building scalable web applications using Laravel,
                    React, AWS, Docker, and modern cloud-native
                    technologies.
                </p>

                <div className="flex gap-4 mt-8">
                    <Link
                        to="/projects"
                        className="px-6 py-3 rounded-lg border"
                    >
                        View Projects
                    </Link>

                    <Link
                        to="/contact"
                        className="px-6 py-3 rounded-lg border"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    );
}