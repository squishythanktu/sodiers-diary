import { Box, Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import userApi from 'src/api/user.api';
import { AppContext } from 'src/contexts/app.context';

interface PasswordFormData {
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePassword() {
  const { profile } = useContext(AppContext);
  const passwordForm = useForm<PasswordFormData>({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: {
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? 'Mật khẩu nhập lại không khớp' : null,
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (newPassword: string) => userApi.changePassword(profile?.id as number, newPassword),
  });

  const handleUpdatePassword = (data: PasswordFormData) => {
    changePasswordMutation.mutate(data.newPassword, {
      onSuccess: (res: AxiosResponse<{ message: string }, any>) => {
        toast.success(res.data.message);
        passwordForm.reset();
      },
      onError: (err: any) => toast.error(err),
    });
  };
  return (
    <Box className="flex flex-col items-center justify-center gap-4">
      <h2 className="my-4 text-center uppercase">Đổi mật khẩu</h2>
      <form onSubmit={passwordForm.onSubmit(handleUpdatePassword)} className="flex w-1/2 flex-col gap-4">
        <div className="form__inputs mt-4 flex flex-col gap-4">
          <PasswordInput
            size="md"
            label="Mật khẩu mới"
            placeholder="Mật khẩu mới"
            {...passwordForm.getInputProps('newPassword')}
          />
          <PasswordInput
            size="md"
            label="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            {...passwordForm.getInputProps('confirmNewPassword')}
          />
        </div>
        <div className="form__actions flex flex-col gap-4">
          <Button className="ml-auto w-1/2" type="submit">
            Đăng ký
          </Button>
        </div>
      </form>
    </Box>
  );
}
