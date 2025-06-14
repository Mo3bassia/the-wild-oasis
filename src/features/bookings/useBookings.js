import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useUrlSearch } from "../../hooks/useUrlSearch";

export function useBookings() {
  const { getParam } = useUrlSearch();
  const status = getParam("status") || "all";
  const sortBy = getParam("sortBy") || "startDate-asc";

  const filter = {
    status: status === "all" ? undefined : status,
    sortBy: sortBy || undefined,
  };

  return useQuery({
    queryKey: ["bookings", status, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });
}
