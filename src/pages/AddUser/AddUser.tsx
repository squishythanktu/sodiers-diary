import { Box, Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import userApi from 'src/api/user.api';
import { UserReq } from 'src/types/user.type';

export default function AddUser() {
  const registerForm = useForm({
    initialValues: {
      username: '',
      password: '',
      roleId: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: (body: UserReq) => userApi.register(body),
  });

  const handleRegister = (values: any) => {
    registerMutation.mutate(
      {
        ...values,
        roleId: values.roleId ? '1' : '2',
      },
      {
        onSuccess: () => {
          toast.success('Register successful!');
          registerForm.reset();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  };

  return (
    <Box className="flex flex-col items-center justify-center gap-4">
      <h2 className="my-4 text-center uppercase">Thêm mới người dùng</h2>
      <form
        onSubmit={registerForm.onSubmit((values) => handleRegister(values))}
        className="flex w-1/2 flex-col gap-4"
      >
        <div className="form__inputs mt-4 flex flex-col gap-4">
          <TextInput
            className="w-auto"
            label="Tên đăng ký"
            placeholder="Tên đăng ký"
            size="md"
            {...registerForm.getInputProps('username')}
          />
          <TextInput
            className="w-auto"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            size="md"
            type="password"
            {...registerForm.getInputProps('password')}
          />
        </div>
        <div className="form__actions flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Checkbox
              mt="md"
              label="Tôi là quản trị viên"
              className="mt-0"
              {...registerForm.getInputProps('roleId', { type: 'checkbox' })}
            />
          </div>
          <Group className="ml-auto w-1/2" mt="md">
            <Button className="w-full" type="submit">
              Đăng ký
            </Button>
          </Group>
        </div>
      </form>
    </Box>
  );
}
