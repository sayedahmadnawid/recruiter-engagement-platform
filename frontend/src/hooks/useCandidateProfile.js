import { useState, useEffect, useRef } from "react";
import { getCandidateByLeadId } from "../services/candidateProfileService";

/**
 * Unwraps a Laravel JsonResource response, which may come back as
 * either the raw object or { data: {...} }.
 */
const unwrapResource = (payload) => payload?.data ?? payload ?? null;

export const useCandidateProfile = (leadId) => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(Boolean(leadId));
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0);

  useEffect(() => {
    fetchProfile();
  }, [leadId]);

  const fetchProfile = async () => {
    if (!leadId) {
      setCandidate(null);
      setError(null);
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const response = await getCandidateByLeadId(leadId);
      if (requestId !== requestIdRef.current) return; // stale response, ignore

      setCandidate(unwrapResource(response));
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      setError(
        err.response?.data?.message || "Failed to load candidate profile",
      );
      setCandidate(null);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  return { candidate, loading, error, refetch: fetchProfile };
};
