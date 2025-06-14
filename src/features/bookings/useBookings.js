import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
}
