import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return updateSetting(data);
    },
    onSuccess: () => {
      toast.success("Settings have been updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.refetchQueries(["settings"]);
    },
    onError: (error) => {
      toast.error("Error updating settings");
      console.error(error);
    },
  });
}
