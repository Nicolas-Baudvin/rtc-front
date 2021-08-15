import './style.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NotFound() {
    const { token } = useSelector((state) => state.user);
    const history = useHistory();

    const onClick = (url) => {
        history.push(url);
    };

    return (
        <div className={'notfound'}>
            <p>Cette page n'existe pas !</p>
            {token ? (
                <button onClick={() => onClick('/dashboard')}>
                    {' '}
                    Dashboard{' '}
                </button>
            ) : (
                <button onClick={() => onClick('/')}> Accueil </button>
            )}
        </div>
    );
}

export default NotFound;
