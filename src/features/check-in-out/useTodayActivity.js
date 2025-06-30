import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    return useQuery({
        queryKey: ["todayActivity"],
        queryFn: getStaysTodayActivity,
    })
}