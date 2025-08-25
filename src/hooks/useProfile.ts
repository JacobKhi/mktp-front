import { useState, useEffect } from "react";
import { getProfile } from "../services/user";

interface ProfileData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  profile: "CUSTOMER" | "SELLER" | "ADMIN";
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Falha ao buscar perfil:", err);
        setError("Não foi possível carregar os dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
