import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return (
    <ButtonIcon
      disabled={isPending}
      onClick={() =>
        logout(
          {},
          {
            onSuccess: () => {
              navigate("/login", { replace: true });
              queryClient.removeQueries({
                queryKey: ["user"],
              });
            },
            onError: (error) => {
              console.error("Logout failed:", error);
            },
          }
        )
      }
      aria-label="Logout"
    >
      {!isPending ? (
        <HiArrowRightOnRectangle className="text-2xl" />
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}
