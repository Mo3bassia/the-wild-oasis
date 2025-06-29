import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";
import { useQueryClient } from "@tanstack/react-query";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    data: { email, user_metadata: { full_name: currentFullName } = "" } = {},
  } = useGetUser() || {};

  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const queryClient = useQueryClient();

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(
      {
        full_name: fullName,
        avatar: avatar,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          // queryClient.setQueryData(["user"], data);
        },
      }
    );
  }

  function handleReset(e) {
    e.preventDefault();
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleReset} variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
