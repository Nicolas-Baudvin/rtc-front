import { RiChatForwardLine, RiChatNewLine } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import { FaListUl, FaUserCircle } from 'react-icons/fa';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import MenuItem from './MenuItem';

const menuItems = [
    {
        Icon: () => <RiChatNewLine />,
        title: 'Créer un salon',
        isSelected: true,
        path: '/',
    },
    {
        Icon: () => <ImExit />,
        title: 'Se déconnecter',
        isSelected: false,
        path: '/',
    },
    {
        Icon: () => <RiChatForwardLine />,
        title: 'Rejoindre un salon',
        isSelected: false,
        path: '/',
    },
    {
        Icon: () => <FaListUl />,
        title: 'Mes salons',
        isSelected: false,
        path: '/',
    },
    {
        Icon: () => <FaUserCircle />,
        title: 'Mon compte',
        isSelected: false,
        path: '/',
    },
    {
        Icon: () => <AiOutlineDollarCircle />,
        title: 'Services',
        isSelected: false,
        path: '/',
    },
];

function Menu() {
    return (
        <div className={'dashboard-menu'}>
            {menuItems.map((menuItem, i) => (
                <MenuItem
                    key={i}
                    Icon={menuItem.Icon}
                    title={menuItem.title}
                    isSelected={menuItem.isSelected}
                    path={menuItem.path}
                />
            ))}
        </div>
    );
}

export default Menu;
