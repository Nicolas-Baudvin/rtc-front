import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import PropTypes from 'prop-types';
import { logout } from '../../Store/UserData/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Header({ page }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    const onClickLogout = () => dispatch(logout());

    useEffect(() => {
        if (!token) {
            history.push('/connexion');
        }
    }, []);

    return (
        <header className={'dashboard-header'}>
            <div className={'dashboard-header-block'}>
                <div className={'dashboard-header-user'}>
                    <AiOutlineUser />
                    <div className={'dashboard-header-user__username'}>
                        Username
                    </div>
                </div>
                <div className={'dashboard-header-buttons'}>
                    <button onClick={onClickLogout}>
                        <ImExit />
                    </button>
                    {page !== 'dashboard' && (
                        <button>
                            <AiOutlineMenu />
                        </button>
                    )}
                </div>
            </div>
            <div className={'dashboard-header-block'}>
                <h1>Dashboard</h1>
            </div>
        </header>
    );
}

Header.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Header;
