import { NavLink, Paper, Text } from '@mantine/core';
import {
  IconLogout,
  IconMoodHappy,
  IconNotebook,
  IconPasswordUser,
  IconUser,
  IconUserEdit,
  IconUserPlus,
  IconUserSquare,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PATH from 'src/constants/path.constant';
import { AppContext } from 'src/contexts/app.context';
import { clearLS } from 'src/utils/auth';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const handleLogout = () => {
    clearLS();
    navigate(PATH.home);
    window.location.reload();
  };

  return (
    <Paper shadow="xs" p="sm">
      {profile?.roleId === 2 && (
        <NavLink
          label={<Text size="lg">Nhật ký của tôi</Text>}
          icon={<IconNotebook size="1rem" stroke={1.5} />}
          className="text-base"
          component={Link}
          to={PATH.myDiary}
          active={location.pathname === PATH.myDiary}
        ></NavLink>
      )}
      {profile?.roleId === 1 && (
        <>
          <NavLink
            label={<Text size="lg">Công cụ cảm xúc</Text>}
            icon={<IconMoodHappy size="1rem" stroke={1.5} />}
            className="text-base"
            component={Link}
            to={PATH.statisticTool}
            active={location.pathname === PATH.statisticTool}
          />
          <NavLink
            label={<Text size="lg">Quản trị người dùng</Text>}
            icon={<IconUserSquare size="1rem" stroke={1.5} />}
            className="text-base"
          >
            <NavLink
              label={<Text size="lg">Danh sách người dùng</Text>}
              icon={<IconUsersGroup size="1rem" stroke={1.5} />}
              className="text-base"
              component={Link}
              to={PATH.users}
              active={location.pathname === PATH.users}
            />
            <NavLink
              label={<Text size="lg">Thêm mới người dùng</Text>}
              icon={<IconUserPlus size="1rem" stroke={1.5} />}
              className="text-base"
              component={Link}
              to={PATH.addUser}
              active={location.pathname === PATH.addUser}
            />
          </NavLink>
        </>
      )}
      <NavLink
        label={<Text size="lg">Tài khoản</Text>}
        icon={<IconUser size="1rem" stroke={1.5} />}
        className="text-base"
      >
        <NavLink
          label={<Text size="lg">Cập nhật thông tin</Text>}
          icon={<IconUserEdit size="1rem" stroke={1.5} />}
          className="text-base"
          component={Link}
          to={PATH.profile}
          active={location.pathname === PATH.profile}
        />
        <NavLink
          label={<Text size="lg">Đổi mật khẩu</Text>}
          icon={<IconPasswordUser size="1rem" stroke={1.5} />}
          className="text-base"
          component={Link}
          to={PATH.changePassword}
          active={location.pathname === PATH.changePassword}
        />
      </NavLink>
      <NavLink
        label={<Text size="lg">Đăng xuất</Text>}
        icon={<IconLogout size="1rem" stroke={1.5} />}
        className="text-base"
        onClick={handleLogout}
      />
    </Paper>
  );
}
