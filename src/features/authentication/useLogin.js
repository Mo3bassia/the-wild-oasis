import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => login({ email, password }),
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
      console.error("Login failed:", error);
    },
  });
}
