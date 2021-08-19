import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/UserData/actions';
import { disconnect } from '../../Store/WebSocket/actions';

function MenuItem({ Icon, title, path }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const onClick = (e) => {
        if (path === '/connexion') {
            dispatch(logout());
            dispatch(disconnect());
        }
        return history.push(path);
    };

    return (
        <div onClick={onClick} className={'dashboard-menu__item'}>
            <h2>
                <Icon />
                {title}
            </h2>
            <div className={'dashboard-menu__item-color'} />
        </div>
    );
}

MenuItem.propTypes = {
    Icon: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default MenuItem;
