import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useUrlSearch } from "../../hooks/useUrlSearch";

export function useBookings() {
  const { getParam } = useUrlSearch();
  const status = getParam("status") || "all";
  const sortBy = getParam("sortBy") || "startDate-asc";
  const page = getParam("page") || 1;

  const filter = {
    status: status === "all" ? undefined : status,
    sortBy: sortBy || undefined,
  };

  return useQuery({
    queryKey: ["bookings", status, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });
}
