import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";

export function useSignUp() {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: ({ fullName, email, password, avatar }) => {
      signUp({ fullName, email, password, avatar });
    },
  });
}
