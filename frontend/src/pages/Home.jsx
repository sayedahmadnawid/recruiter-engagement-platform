import HeroSection from '../components/home/HeroSection';
import SkillsSection from '../components/home/SkillsSection';
import ProjectsSection from '../components/home/ProjectsSection';
import CertificationsSection from '../components/home/CertificationsSection';

export default function Home() {
    return (
        <>
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />
        </>
    );
}