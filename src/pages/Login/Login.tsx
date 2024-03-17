import AuthLayout from 'src/layouts/AuthLayout';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import PATH from 'src/constants/path.constant';
import { Box, Button, Group, TextInput, rem } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';

const Login: React.FC = () => {
  const loginForm = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  return (
    <AuthLayout>
      <Box
        styles={{
          maxWidth: '100%',
        }}
      >
        <div className="mb-2 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <IconStar style={{ width: rem(40), height: rem(40) }} stroke={1.5} fill="yellow" color="yellow" />
            <h1 className="m-0 text-[40px] text-red-500">Nhật ký điện tử</h1>
            <IconStar style={{ width: rem(40), height: rem(40) }} stroke={1.5} fill="yellow" color="yellow" />
          </div>
          <h2 className="text-[25px] text-green-500">Sẻ chia & Thấu hiểu</h2>
        </div>
        <form
          onSubmit={loginForm.onSubmit((values) => console.log(values))}
          className="flex w-full flex-col gap-4"
        >
          <div className="form__header flex items-center">
            <div className="form flex flex-col gap-2 bg-white">
              <div className="flex">
                <span className="text-gray-400">Chưa có tài khoản?</span>
                <Link className="ml-1 font-bold text-red-500" to={PATH.register}>
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
          <div className="form__inputs mt-4 flex flex-col gap-4">
            <TextInput
              className="w-auto"
              label="Tên đăng nhập"
              placeholder="Tên đăng nhập"
              size="md"
              {...loginForm.getInputProps('username')}
            />
            <TextInput
              className="w-auto"
              label="Mật khẩu"
              placeholder="Mật khẩu"
              size="md"
              {...loginForm.getInputProps('password')}
            />
          </div>
          <div className="form__actions flex flex-col gap-4">
            <div className="flex justify-end">
              <Link className="ml-1 font-bold text-red-500" to="/reset">
                Quên mật khẩu?
              </Link>
            </div>
            <Group className="ml-auto w-1/2" mt="md">
              <Button className="w-full" type="submit">
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
