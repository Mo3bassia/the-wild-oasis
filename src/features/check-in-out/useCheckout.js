import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUrlSearch } from "../../hooks/useUrlSearch";

export function useCheckout(id) {
  const queryClient = useQueryClient();
  const { getParam } = useUrlSearch();
  const status = getParam("status") || "all";
  const sortBy = getParam("sortBy") || "startDate-asc";
  const page = getParam("page") || 1;

  return useMutation({
    mutationFn: () => {
      updateBooking(id, {
        status: "checked-out",
      });
    },
    mutationKey: ["checkout", id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
        active: true,
      });
      queryClient.refetchQueries(["booking", id]);
      queryClient.invalidateQueries({
        queryKey: ["bookings", status, sortBy, Number(page)],
        active: true,
      });
      toast.success(`Booking #${id} checked out successfully!`);
    },
    onError: (error) => {
      toast.error(`Error checking out booking #${id}: ${error.message}`);
    },
  });
}
