import { useParams } from "react-router-dom";
import { useCandidateProfile } from "../hooks/useCandidateProfile";
import CandidateInfoCard from "../components/CandidateInfoCard";
import CandidateSkillsCard from "../components/CandidateSkillsCard";
import CandidateExperiencesCard from "../components/CandidateExperiencesCard";
import CandidateEductionsCard from "../components/CandidateEductionsCard";
import CandidateCertifications from "../components/CandidateCertifications";
import {
  updateCandidateBasicInfo,
  updateCandidateSkills,
  updateCandidateExperience,
  updateCandidateEducation
} from "../services/candidateProfileService";
import { useToast } from "../../../context/ToastContext";

export default function CandidateProfilePage() {
  const { leadId } = useParams();
  const { candidate, loading, error, setCandidate } =
    useCandidateProfile(leadId);
  const { showToast } = useToast();

  const handleBasicInfoUpdate = async (updatedData) => {
    const response = await updateCandidateBasicInfo(candidate.id, updatedData);
    setCandidate(response?.data ?? response);
    showToast("Header part updated successfully!", "success");
  };

  const handleSkillsUpdate = async (updatedSkills) => {
    const response = await updateCandidateSkills(candidate.id, updatedSkills);
    setCandidate(response?.data ?? response);
    showToast("Skill part updated successfully!", "success");
  };

  const handleExperiencesUpdate = async (updatedExperiences) => {
    const response = await updateCandidateExperience(candidate.id, updatedExperiences);
    setCandidate(response?.data ?? response);
    showToast("Experiences part updated successfully!", "success");
  };

  const handleEducationsUpdate = async (updatedEducations) => {
    const response = await updateCandidateEducation(candidate.id, updatedEducations);
    setCandidate(response?.data ?? response);
    showToast("Experiences part updated successfully!", "success");
  };

  if (loading) return <div className="p-12 flex justify-center"></div>;
  if (error)
    return (
      <div className="m-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
    );
  if (!candidate)
    return (
      <div className="p-12 text-center text-gray-500">
        Candidate profile not found for this Lead.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <CandidateInfoCard
        candidate={candidate}
        onSave={handleBasicInfoUpdate}
        onViewResume={() => console.log("Resume clicked")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CandidateExperiencesCard
            experience={candidate.experience || []}
            onSave={handleExperiencesUpdate}
          />
          <CandidateEductionsCard 
          education={candidate.education || []}
          onSave={handleEducationsUpdate}
           />
        </div>
        <div className="space-y-6">
          <CandidateSkillsCard
            skills={candidate.skills || []}
            onSave={handleSkillsUpdate}
          />
          <CandidateCertifications
            certifications={candidate.certifications || []}
          />
        </div>
      </div>
    </div>
  );
}
