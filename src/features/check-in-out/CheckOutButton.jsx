import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { mutate: checkOut, isLoading } = useCheckout(bookingId);
  return (
    <Button
      variation="primary"
      size="small"
      onClick={checkOut}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
