import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import authApi from 'src/api/auth.api';
import { AppContext } from 'src/contexts/app.context';
import AuthLayout from 'src/layouts/AuthLayout';
import { UserReq } from 'src/types/user.type';

const Login: React.FC = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const loginForm = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  const loginMutation = useMutation({
    mutationFn: (body: UserReq) => authApi.login(body),
  });

  const handleLogin = (body: UserReq) => {
    loginMutation.mutate(body, {
      onSuccess: (res: AxiosResponse<any, any>) => {
        setIsAuthenticated(true);
        setProfile(res.data);
      },
      onError: () => {
        toast.error('Login failed!');
      },
    });
  };

  return (
    <AuthLayout>
      <Box
        styles={{
          maxWidth: '100%',
        }}
      >
        <form onSubmit={loginForm.onSubmit(handleLogin)} className="flex w-full flex-col gap-4">
          <div className="form__inputs mt-4 flex flex-col gap-4">
            <TextInput
              className="w-auto"
              label="Tên đăng nhập"
              placeholder="Tên đăng nhập"
              size="md"
              {...loginForm.getInputProps('username')}
            />
            <PasswordInput
              className="w-auto"
              label="Mật khẩu"
              placeholder="Mật khẩu"
              size="md"
              {...loginForm.getInputProps('password')}
            />
          </div>
          <div className="form__actions flex flex-col gap-4">
            <Group className="ml-auto w-1/2" mt="md">
              <Button loading={loginMutation.isPending} className="w-full" type="submit">
                Đăng nhập
              </Button>
            </Group>
          </div>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default Login;
