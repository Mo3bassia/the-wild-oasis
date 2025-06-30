import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numberOfBookings = bookings?.length || 0;

  const sales =
    bookings?.reduce((total, booking) => {
      return +(total + (booking.totalPrice || 0));
    }, 0) || 0;

  const checkIns = confirmedStays?.length || 0;

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  console.log(occupancyRate);

  return (
    <>
      <Stat
        title={"bookings"}
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numberOfBookings}
      />
      <Stat
        title={"sales"}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"check ins"}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title={"Occupancy rate"}
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}
