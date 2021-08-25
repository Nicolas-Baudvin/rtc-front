import PropTypes from 'prop-types';
import './style.scss';

function Textarea({ onChange, value }) {
    return (
        <textarea
            placeholder={'Votre message...'}
            className={'textarea'}
            onChange={onChange}
            value={value}
        />
    );
}

Textarea.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default Textarea;
