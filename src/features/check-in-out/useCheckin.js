import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin(id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (breakfast) => {
      console.log(breakfast);
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    mutationKey: ["checkin", id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
        active: true,
      });
      queryClient.refetchQueries(["booking", id]);
      navigate("/");
      toast.success(`Booking #${id} checked in successfully!`);
    },
    onError: (error) => {
      toast.error(`Error checking in booking #${id}: ${error.message}`);
    },
  });
}
