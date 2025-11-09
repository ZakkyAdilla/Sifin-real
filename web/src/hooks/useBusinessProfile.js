import { useState } from "react";

export function useBusinessProfile() {
  const [businessProfile, setBusinessProfile] = useState(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("sifinBusinessProfile");
      if (savedProfile) {
        return JSON.parse(savedProfile);
      }
    }
    return null;
  });

  return { businessProfile, setBusinessProfile };
}
