import './style.scss';
import Menu from './Menu';
import Header from '../../Components/Header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Dashboard() {
    const history = useHistory();
    const { token } = useSelector((state) => state.user);

    useEffect(() => {
        if (!token) {
            history.push('/connexion');
        }
    }, [token]);

    return (
        <div className={'dashboard'}>
            <Header page={'dashboard'} />
            <Menu />
        </div>
    );
}

export default Dashboard;
