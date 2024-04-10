import { Box, Button, Grid, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import companiesApi from 'src/api/company.api';
import positionApi from 'src/api/position.api';
import rankApi from 'src/api/rank.api';
import userApi from 'src/api/user.api';
import { AppContext } from 'src/contexts/app.context';
import { User } from 'src/types/user.type';

type ProfileFormData = Omit<User, 'id' | 'userName'>;

export default function Profile() {
  const { profile } = useContext(AppContext);
  const profileForm = useForm<ProfileFormData>({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      rankId: null,
      positionId: null,
      companiesId: null,
    },
    validate: {
      email: (value) => (value != undefined ? (/^\S+@\S+$/.test(value) ? null : 'Invalid email') : null),
      phoneNumber: (value) =>
        value !== undefined ? (/^\d{10}$/g.test(value) ? null : 'Invalid phone number') : null,
    },
  });
  const { data: profileData } = useQuery({
    queryKey: [`user profile with id ${profile?.id}`, profile?.id],
    queryFn: () => userApi.getUserProfile(profile?.id as number),
  });

  const { data: ranksData } = useQuery({
    queryKey: [`ranks`],
    queryFn: () => rankApi.getRanks(),
  });
  const { data: positionsData } = useQuery({
    queryKey: [`positions`],
    queryFn: () => positionApi.getPositions(),
  });
  const { data: companiesData } = useQuery({
    queryKey: [`companies`],
    queryFn: () => companiesApi.getCompanies(),
  });

  useEffect(() => {
    if (profileData?.data) {
      const { name, phoneNumber, email, rankId, positionId, companiesId } = profileData.data;
      profileForm.setValues({
        name: name || '',
        phoneNumber: phoneNumber || '',
        email: email || '',
        rankId: (ranksData?.data.find((r) => r.id === rankId)?.name as any) || null,
        positionId: (positionsData?.data.find((p) => p.id === positionId)?.name as any) || null,
        companiesId: (companiesData?.data.find((c) => c.id === companiesId)?.name as any) || null,
      });
    }
  }, [profileData]);

  const getRankIdByName = (name: string | undefined) =>
    ranksData?.data.find((r) => r.name === name)?.id || null;

  const getPositionIdByName = (name: string | undefined) =>
    positionsData?.data.find((p) => p.name === name)?.id || null;

  const getCompanyIdByName = (name: string | undefined) =>
    companiesData?.data.find((c) => c.name === name)?.id || null;

  const handleUpdateProfile = (data: ProfileFormData) => {
    const formattedData: ProfileFormData = {
      ...data,
      rankId: getRankIdByName(data.rankId?.toString()),
      positionId: getPositionIdByName(data.positionId?.toString()),
      companiesId: getCompanyIdByName(data.companiesId?.toString()),
    };

    updateUserProfileMutation.mutate(formattedData, {
      onSuccess: () => {
        toast.success('Cập nhật thông tin thành công');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const updateUserProfileMutation = useMutation({
    mutationFn: (data: ProfileFormData) => userApi.updateUserProfile(profile?.id as number, data),
  });

  return (
    <Box>
      <h2 className="my-4 text-center uppercase">Cập nhật thông tin</h2>
      <form onSubmit={profileForm.onSubmit(handleUpdateProfile)} className="flex w-full flex-col gap-4">
        <Grid>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Họ và tên</span>
              <TextInput size="md" placeholder="Họ và tên" {...profileForm.getInputProps('name')} />
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
              <Select
                searchable
                placeholder="Cấp bậc"
                data={ranksData?.data.map((r) => r.name) || []}
                {...profileForm.getInputProps('rankId')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Chức vụ</span>
              <Select
                searchable
                placeholder="Chức vụ"
                data={positionsData?.data.map((r) => r.name) || []}
                {...profileForm.getInputProps('positionId')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-28 font-bold">Đại đội</span>
              <Select
                searchable
                placeholder="Đại đội"
                data={companiesData?.data.map((r) => r.name) || []}
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
