import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from './useEditCabin'

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { createCabin, isCreating } = useCreateCabin()
  const { editCabin, isEditing } = useEditCabin()
  const isWorking = isCreating || isEditing

  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const { errors } = formState

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if (isEditSession) editCabin(
      { newCabinData: { ...data, image }, id: editId },
      {
        onSuccess: (data) => {
          console.log(data)
          reset()
          onClose?.()
        }
      }
    )
    else createCabin(
      { ...data, image: image },
      {
        onSuccess: (data) => {
          console.log(data)
          reset()
          onClose?.()
        }
      }
    )
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >

      <FormRow label="Cabin name" error={errors?.maxCapacity?.message} disabled={isWorking}>
        <Input type="text" id="name" disabled={isWorking} {...register('name', {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message} disabled={isWorking}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity atleast should be 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message} disabled={isWorking}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice', {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity atleast should be 1"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} disabled={isWorking}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register('discount', {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} {...register('description', {
          required: isEditSession ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register('image', {
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" sizes="medium" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button variations="primary" sizes="medium" disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create new Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;