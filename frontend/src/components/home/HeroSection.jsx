import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="max-w-4xl mx-auto px-6 py-12">
            <p className="text-lg font-medium text-gray-600">
                Full Stack Developer
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight">
                Sayed Ahmad Nawid
            </h1>

            <p className="mt-4 text-lg text-gray-600">
                AWS Certified Solutions Architect – Associate
            </p>

            <p className="mt-6 text-xl leading-relaxed text-gray-700">
                Full Stack Developer with experience building enterprise
                applications, e-commerce platforms, and cloud-native
                solutions using Laravel, React, Vue.js, AWS, Docker,
                and MySQL.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                    to="/projects"
                    className="rounded-lg border px-6 py-3 font-medium transition hover:bg-gray-100"
                >
                    View Projects
                </Link>

                <Link
                    to="/contact"
                    className="rounded-lg border px-6 py-3 font-medium transition hover:bg-gray-100"
                >
                    Contact Me
                </Link>
            </div>
        </section>
    );
}