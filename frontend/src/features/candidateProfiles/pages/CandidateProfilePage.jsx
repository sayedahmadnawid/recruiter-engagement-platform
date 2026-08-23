
import { useParams } from 'react-router-dom';
import { useCandidateProfile } from '../hooks/useCandidateProfile';
import CandidateHeader from '../components/CandidateHeader';
import CandidateSkills from '../components/CandidateSkills';
import CandidateExperience from '../components/CandidateExperiences';
import CandidateEductions from '../components/CandidateEductions';
import CandidateCertifications from '../components/CandidateCertifications';
//import Spinner from '../../../components/common/Spinner';

export default function CandidateProfilePage() {
  const { leadId } = useParams();
  const { candidate, loading, error } = useCandidateProfile(leadId);
  

 if (loading) return <div className="p-12 flex justify-center"></div>;
  if (error) return <div className="m-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;
  if (!candidate) return <div className="p-12 text-center text-gray-500">Candidate profile not found for this Lead.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <CandidateHeader 
        candidate={candidate} 
        onEdit={() => console.log('Edit clicked')} 
        onViewResume={() => console.log('Resume clicked')} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CandidateExperience experience={candidate.experience || []} />
          <CandidateEductions education={candidate.education || []} />
        </div>
        <div className="space-y-6">
        <CandidateSkills skills={candidate.skills || []} />
        <CandidateCertifications certifications={candidate.certifications || []} />
        </div>
      </div>
    </div>
  );
}