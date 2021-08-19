import './style.scss';
import Menu from './Menu';
import Header from '../../Components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { connect } from '../../Store/WebSocket/actions';

function Dashboard() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.server);

    useEffect(() => {
        if (!token) {
            history.push('/connexion');
        }
    }, [token]);

    useEffect(() => {
        if (!socket) {
            dispatch(connect());
        }
    }, []);

    return (
        <div className={'dashboard'}>
            <Header page={'dashboard'} />
            <Menu />
        </div>
    );
}

export default Dashboard;
