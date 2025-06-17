import { useMutation } from "@tanstack/react-query";
import { logout as apiLogout } from "../../services/apiAuth";

export function useLogout() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: apiLogout,
  });
}
