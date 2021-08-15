import { Link } from 'react-router-dom';

function Links({ page }) {
    return (
        <>
            {page === 'signup' && (
                <Link to={'/connexion'}>Tu as déjà un compte ?</Link>
            )}
            {page === 'login' && (
                <Link to="/oublie-mot-de-passe">Mot de passe oublié ?</Link>
            )}
            {page === 'login' && (
                <Link to="/inscription">Tu n'as pas de compte ?</Link>
            )}
        </>
    );
}

export default Links;
