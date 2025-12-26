import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthenticatedLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return <Outlet />;
}