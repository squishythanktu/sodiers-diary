import { NavLink, Paper, Text } from '@mantine/core';
import {
  IconUser,
  IconMoodHappy,
  IconLogout,
  IconNotebook,
  IconUsersGroup,
  IconUserPlus,
  IconTool,
  IconFlag2,
  IconMoodSearch,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import PATH from 'src/constants/path.constant';

export default function NavBar() {
  const location = useLocation();

  return (
    <Paper shadow="xs" p="sm">
      <NavLink
        label={<Text size="lg">Nhật ký của tôi</Text>}
        icon={<IconNotebook size="1rem" stroke={1.5} />}
        className="text-base"
        component={Link}
        to={PATH.myDiary}
        active={location.pathname === PATH.myDiary}
      ></NavLink>
      <NavLink
        label={<Text size="lg">Công cụ cảm xúc</Text>}
        icon={<IconMoodHappy size="1rem" stroke={1.5} />}
        className="text-base"
      />
      <NavLink
        label={<Text size="lg">Quản trị người dùng</Text>}
        icon={<IconUser size="1rem" stroke={1.5} />}
        className="text-base"
      >
        <NavLink
          label={<Text size="lg">Danh sách người dùng</Text>}
          icon={<IconUsersGroup size="1rem" stroke={1.5} />}
          className="text-base"
        />
        <NavLink
          label={<Text size="lg">Thêm mới người dùng</Text>}
          icon={<IconUserPlus size="1rem" stroke={1.5} />}
          className="text-base"
        />
        <NavLink
          label={<Text size="lg">Công cụ hệ thống</Text>}
          icon={<IconTool size="1rem" stroke={1.5} />}
          className="text-base"
        >
          <NavLink
            label={<Text size="lg">Danh mục cảm xúc</Text>}
            icon={<IconMoodSearch size="1rem" stroke={1.5} />}
            className="text-base"
          />
          <NavLink
            label={<Text size="lg">Slogan</Text>}
            icon={<IconFlag2 size="1rem" stroke={1.5} />}
            className="text-base"
          />
        </NavLink>
      </NavLink>
      <NavLink
        label={<Text size="lg">Đăng xuất</Text>}
        icon={<IconLogout size="1rem" stroke={1.5} />}
        className="text-base"
      />
    </Paper>
  );
}
