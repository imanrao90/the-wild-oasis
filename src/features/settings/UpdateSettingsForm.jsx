import Spinner from '../../ui/Spinner'
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateSetting } from './useUpdateSetting';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {
  const { isLoading, settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  } = {} } = useSettings()
  const { updateSetting, isUpdating } = useUpdateSetting()

  if (isLoading) return <Spinner />

  function handleUpdate(e, field) {
    const { value } = e.target

    if (!value) return
    updateSetting({ [field]: value })
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking' defaultValue={maxGuestsPerBooking}>
        <Input
          type='number'
          id='max-guests'
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label='Breakfast price' defaultValue={breakfastPrice}>
        <Input
          type='number'
          id='breakfast-price'
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;