import { useEffect } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const { data: settings, isLoading: isFetching } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const { mutate: updateSettings, isLoading: isUpdating } = useEditSettings();

  function handleUpdateSettings(name, value) {
    updateSettings({ [name]: value });
  }

  const isWorking = isFetching || isUpdating;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isWorking}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleUpdateSettings("minBookingLength", e.target.value)
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isWorking}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) =>
            handleUpdateSettings("maxBookingLength", e.target.value)
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isWorking}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleUpdateSettings("maxGuestsPerBooking", e.target.value)
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isWorking}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSettings("breakfastPrice", e.target.value)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
