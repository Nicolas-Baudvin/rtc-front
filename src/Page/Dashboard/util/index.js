import { RiChatForwardLine, RiChatNewLine } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import { FaListUl, FaUserCircle } from 'react-icons/fa';
import { AiOutlineDollarCircle } from 'react-icons/ai';

export const menuItems = [
    {
        Icon: () => <RiChatNewLine />,
        title: 'Créer un salon',
        path: '/creer-salon',
    },
    {
        Icon: () => <ImExit />,
        title: 'Se déconnecter',
        path: '/connexion',
    },
    {
        Icon: () => <RiChatForwardLine />,
        title: 'Rejoindre un salon',
        path: '/rejoindre-salon',
    },
    {
        Icon: () => <FaListUl />,
        title: 'Mes salons',
        path: '/salons/',
    },
    {
        Icon: () => <FaUserCircle />,
        title: 'Mon compte',
        path: '/mon-compte',
    },
    {
        Icon: () => <AiOutlineDollarCircle />,
        title: 'Services',
        path: '/services',
    },
];
