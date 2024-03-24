import { Box, Button, Grid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function ChangePassword() {
  const passwordForm = useForm({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleUpdatePassword = () => {};
  return (
    <Box>
      <h2 className="my-4 text-center uppercase">Đổi mật khẩu</h2>
      <form onSubmit={passwordForm.onSubmit(handleUpdatePassword)} className="flex w-full flex-col gap-4">
        <Grid>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-48 font-bold">Mật khẩu mới</span>
              <TextInput
                size="md"
                placeholder="Mật khẩu mới"
                className=""
                {...passwordForm.getInputProps('newPassword')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-48 font-bold">Nhập lại mật khẩu mới</span>
              <TextInput
                size="md"
                placeholder="Mật khẩu mới"
                className=""
                {...passwordForm.getInputProps('confirmNewPassword')}
              />
            </div>
          </Grid.Col>
        </Grid>
        <Button className="ml-auto w-fit" type="submit">
          Cập nhật
        </Button>
      </form>
    </Box>
  );
}
