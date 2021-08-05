import cx from 'classnames';
import { VscLoading } from 'react-icons/vsc';

function Button({ page, isLoading }) {
    return page === 'signup' ? (
        <button
            className={cx('page-button', {
                'page-loading': isLoading,
            })}
            type="submit"
        >
            {isLoading ? <VscLoading /> : "S'inscrire"}
        </button>
    ) : (
        <button
            className={cx('page-button', {
                'page-loading': isLoading,
            })}
            type="submit"
        >
            {isLoading ? <VscLoading /> : 'Connexion'}
        </button>
    );
}

export default Button;
