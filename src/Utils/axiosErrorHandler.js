import { logout } from '../Store/UserData/actions';

function axiosErrorHandler(error, dispatch) {
    if (error?.response?.status === 403) {
        dispatch(logout());
        return 'Accès refusé';
    }
    if (error?.response?.data?.error) {
        return error.response.data.error;
    } else if (error?.response?.data?.errors) {
        return error.response.data.errors[0].msg;
    } else {
        return 'Une erreur est survenue avec le serveur.';
    }
}

export default axiosErrorHandler;
