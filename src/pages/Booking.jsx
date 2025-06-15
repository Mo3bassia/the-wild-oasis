import { useParams } from "react-router-dom";
import BookingDetail from "../features/bookings/BookingDetail";

export default function Booking() {
  const { bookingId } = useParams();
  return (
    <div>
      <BookingDetail id={bookingId} />
    </div>
  );
}
