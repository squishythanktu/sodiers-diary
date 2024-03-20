import { Table, ActionIcon, Pagination, Group, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

const elements = [
  {
    id: 1,
    username: 'admin',
    name: 'Quản trị hệ thống',
    rank: 'Trung úy',
    position: 'Tiểu đoàn trưởng',
    type: 'Hệ 5',
    class: 'Lớp 3',
    battalion: 'Tiểu đoàn 3',
    company: 'Đại đội 2',
  },
  {
    id: 2,
    username: 'admin',
    name: 'Quản trị hệ thống',
    rank: 'Trung úy',
    position: 'Tiểu đoàn trưởng',
    type: 'Hệ 5',
    class: 'Lớp 3',
    battalion: 'Tiểu đoàn 3',
    company: 'Đại đội 2',
  },
  {
    id: 3,
    username: 'admin',
    name: 'Quản trị hệ thống',
    rank: 'Trung úy',
    position: 'Tiểu đoàn trưởng',
    type: 'Hệ 5',
    class: 'Lớp 3',
    battalion: 'Tiểu đoàn 3',
    company: 'Đại đội 2',
  },
];

export default function Users() {
  const rows = elements.map((element) => (
    <tr key={element.username}>
      <td>{element.username}</td>
      <td>{element.name}</td>
      <td>{element.rank}</td>
      <td>{element.position}</td>
      <td>{element.type}</td>
      <td>{element.class}</td>
      <td>{element.battalion}</td>
      <td>{element.company}</td>
      <ActionIcon variant="transparent" color="red">
        <IconTrash size="1rem" />
      </ActionIcon>
    </tr>
  ));

  return (
    <Box>
      <h2 className="my-4 text-center uppercase">Quản trị người dùng</h2>
      <Table>
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Họ và tên</th>
            <th>Cấp bậc</th>
            <th>Chức vụ</th>
            <th>Hệ</th>
            <th>Lớp</th>
            <th>Tiểu đoàn</th>
            <th>Đại đội</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Box className="mt-8 flex items-center justify-center gap-2">
        <span>Page 1 of 10 (10 items)</span>
        <Pagination.Root
          total={10}
          getItemProps={(page) => ({
            component: 'a',
            href: `#page-${page}`,
          })}
        >
          <Group spacing={7} position="center">
            <Pagination.First component="a" href="#page-0" />
            <Pagination.Previous component="a" href="#page-1" />
            <Pagination.Items />
            <Pagination.Next component="a" href="#page-2" />
            <Pagination.Last component="a" href="#page-10" />
          </Group>
        </Pagination.Root>
      </Box>
    </Box>
  );
}
