import './style.scss';
import Menu from './Menu';
import Header from '../../Components/Header';

function Dashboard() {
    return (
        <div className={'dashboard'}>
            <Header page={'dashboard'} />
            <Menu />
        </div>
    );
}

export default Dashboard;
