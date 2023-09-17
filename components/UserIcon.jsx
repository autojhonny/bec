import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space, theme } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#profile">
        Profile
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#mfa">
        MFA
      </a>
    ),
    icon: <SmileOutlined />,
    // disabled: true,
  },
  {
    type: 'divider',
  },

  {
    key: '4',
    danger: true,
    label: (
        <button
        onClick={() => signOut()}
        // className="px-6 py-2"
      >
        Log Out
      </button>
  )
  },
];
const UserIcon = () => (
  <Dropdown
    menu={{
      items,
    }}
    arrow
placement='bottomRight' className='ml-4'
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space className=''>
        <Avatar shape="square" className='bg-gray-50' icon={<UserOutlined className='font-light text-black' />} />
             </Space>
    </a>
  </Dropdown>
);
export default UserIcon;