import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ password, avatar, full_name }) => {
      return updateUserData({ password, avatar, full_name });
    },
    onSuccess: (user) => {
      toast.success("User data updated successfully!");

      queryClient.setQueryData(["user"], user.user);
    },
    mutationKey: ["updateUser"],
  });
}
