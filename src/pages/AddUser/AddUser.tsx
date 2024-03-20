import { Box, Button, Checkbox, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function AddUser() {
  const addUserForm = useForm({
    initialValues: {
      username: '',
      isAdministrator: false,
    },
  });

  return (
    <Box className="flex flex-col gap-4">
      <h2 className="my-4 text-center uppercase">Thêm mới người dùng</h2>
      <form onSubmit={addUserForm.onSubmit((values) => console.log(values))} className="flex flex-row">
        <span className="font-bold">Tên người dùng</span>
        <TextInput size="md" placeholder="Tên người dùng" {...addUserForm.getInputProps('username')} />
        <Checkbox
          label="Tôi là quản trị viên"
          className="mt-0"
          {...addUserForm.getInputProps('isAdministrator', { type: 'checkbox' })}
        />
        <Button className="w-full" type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
