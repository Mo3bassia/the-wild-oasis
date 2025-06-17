import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: user, isLoading } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user?.role === "authenticated") {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "var(--color-grey-50)",
        }}
      >
        <Spinner />
      </div>
    );
  }
  if (!user) {
    navigate("/login");
  }
  if (user?.role === "authenticated") return children;
}
