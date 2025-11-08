import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState
  console.log(errors)

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({ queryKey: ["cabins"] })
      reset()
    },
    onError: (err) => toast.error(err.message)
  })

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] })
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin name" error={errors?.maxCapacity?.message} disabled={isCreating}>
        <Input type="text" id="name" disabled={isCreating} {...register('name', {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message} disabled={isCreating}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register('maxCapacity', {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity atleast should be 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message} disabled={isCreating}>
        <Input type="number" id="regularPrice" disabled={isCreating} {...register('regularPrice', {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity atleast should be 1"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} disabled={isCreating}>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0} {...register('discount', {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} disabled={isCreating}>
        <Textarea type="number" id="description" disabled={isCreating} {...register('description', {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isCreating}
          {...register('image', {
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" sizes="medium" type="reset">
          Cancel
        </Button>
        <Button variations="primary" sizes="medium" disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;