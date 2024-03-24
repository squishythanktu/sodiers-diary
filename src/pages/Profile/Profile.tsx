import { Box, Button, Grid, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from 'src/types/user.type';

export default function Profile() {
  const profileForm = useForm<User>({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      rankId: 0,
      positionId: 0,
      companiesId: 0,
    },
    validate: {
      email: (value) => (value != undefined ? (/^\S+@\S+$/.test(value) ? null : 'Invalid email') : null),
      phoneNumber: (value) =>
        value !== undefined ? (/^\d{10}$/g.test(value) ? null : 'Invalid phone number') : null,
    },
  });

  const handleUpdateProfile = () => {};

  return (
    <Box>
      <h2 className="my-4 text-center uppercase">Cập nhật thông tin</h2>
      <form onSubmit={profileForm.onSubmit(handleUpdateProfile)} className="flex w-full flex-col gap-4">
        <Grid>
          <Grid.Col span={12}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Họ và tên</span>
              <TextInput
                size="md"
                placeholder="Họ và tên"
                className="w-1/2"
                {...profileForm.getInputProps('name')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Email</span>
              <TextInput size="md" placeholder="Email" className="" {...profileForm.getInputProps('email')} />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Số điện thoại</span>
              <TextInput
                size="md"
                placeholder="Số điện thoại"
                className=""
                {...profileForm.getInputProps('phoneNumber')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Cấp bậc</span>
              <Select placeholder="Cấp bậc" data={['Tá', 'Úy']} {...profileForm.getInputProps('rankId')} />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Chức vụ</span>
              <Select
                placeholder="Chức vụ"
                data={['Đại tướng', 'Thượng tướng', 'Trung tướng', 'Thiếu tướng']}
                {...profileForm.getInputProps('positionId')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Đại đội</span>
              <Select
                placeholder="Đại đội"
                data={['Đại đội 1', 'Đại đội 2']}
                {...profileForm.getInputProps('companiesId')}
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
