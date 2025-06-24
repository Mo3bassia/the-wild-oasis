import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";

export function useSignUp() {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: ({ fullName, email, password }) =>
      signUp({ fullName, email, password }),
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
