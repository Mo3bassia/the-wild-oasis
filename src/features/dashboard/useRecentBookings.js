import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useUrlSearch } from "../../hooks/useUrlSearch";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const { getParam } = useUrlSearch();
  const numDays = +getParam("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  return useQuery({
    queryKey: ["recentBookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
}
