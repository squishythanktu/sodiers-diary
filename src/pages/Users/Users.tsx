import { ActionIcon, Box, Button, Group, Modal, Pagination, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import companiesApi from 'src/api/company.api';
import positionApi from 'src/api/position.api';
import rankApi from 'src/api/rank.api';
import userApi from 'src/api/user.api';
import { UserRole } from 'src/enums/role.enum';
import { PaginationParams } from 'src/types/pagination-params.type';
import { User } from 'src/types/user.type';

export default function Users() {
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({ page: 1, size: 10 });
  const [totalOfPages, setTotalOfPages] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectUser, setSelectedUser] = useState<User | undefined>(undefined);
  const { data: usersData, refetch } = useQuery({
    queryKey: [`users list with page ${paginationParams.page}`, paginationParams],
    queryFn: () => userApi.getUsers(paginationParams),
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
    if (usersData) {
      setTotalOfPages(Math.ceil(parseInt(usersData.headers['x-total']) / (paginationParams.size as number)));
    }
  }, [usersData, paginationParams.size]);

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
  });

  const getRankNameById = (id: number) => ranksData?.data.find((r) => r.id === id)?.name;

  const getPositionNameById = (id: number) => positionsData?.data.find((p) => p.id === id)?.name;

  const getCompanyNameById = (id: number) => companiesData?.data.find((c) => c.id === id)?.name;

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(Number(selectUser?.id), {
      onSuccess: (res: AxiosResponse<any, any>) => {
        toast.success(res.data);
        close();
        refetch();
      },
      onError: (error: any) => {
        close();
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <Box>
      <h2 className="my-4 text-center uppercase">Quản trị người dùng</h2>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên người dùng</th>
            <th>Họ và tên</th>
            <th>Cấp bậc</th>
            <th>Chức vụ</th>
            <th>Đại đội</th>
            <th>Vai trò</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName || 'N/A'}</td>
              <td>{user.name || 'N/A'}</td>
              <td>{getRankNameById(user.rankId as number) || 'N/A'}</td>
              <td>{getPositionNameById(user.positionId as number) || 'N/A'}</td>
              <td>{getCompanyNameById(user.companiesId as number) || 'N/A'}</td>
              <td>{user.id === 1 ? UserRole.ADMIN : UserRole.USER}</td>
              <ActionIcon
                variant="transparent"
                color="red"
                onClick={() => {
                  setSelectedUser(user);
                  open();
                }}
              >
                <IconTrash size="1rem" />
              </ActionIcon>
            </tr>
          ))}
        </tbody>
      </Table>
      <Box className="mt-8 flex items-center justify-center gap-2">
        <span>
          Page {paginationParams.page} of {totalOfPages} ({paginationParams.size} item(s))
        </span>
        <Pagination.Root
          total={totalOfPages}
          onChange={(page) => {
            setPaginationParams((prevPagination) => ({
              ...prevPagination,
              page,
            }));
          }}
        >
          <Group spacing={7} position="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
        <Modal opened={opened} onClose={close} title="Confirm delete user" centered>
          <span>Are you sure want to delete this user?</span>
          <Box className="mt-4 flex justify-end gap-2">
            <Button variant="outline" color="red" onClick={close}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleDeleteUser}>
              Confirm
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
