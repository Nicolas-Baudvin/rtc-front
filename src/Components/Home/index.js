import './style.scss';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    const onClick = () => {
        history.push('/connexion');
    };
    return (
        <main>
            <header>
                <h1>Bienvenue</h1>
            </header>
            <h1>
                Bienvenue sur <strong>Filoo</strong>, votre service de chat en
                temps réel
            </h1>
            <button onClick={onClick}> Se connecter </button>
        </main>
    );
}

export default Home;
