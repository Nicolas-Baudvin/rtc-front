import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import './style.scss';

function Input({ labelProps, inputProps, labelTitle, error }) {
    const [isSelected, setSelected] = useState(false);

    const onBlur = () => {
        if (inputProps.value) {
            return setSelected(true);
        }
        return setSelected(false);
    };

    const onFocus = () => setSelected(true);

    useEffect(() => {
        if (inputProps.value) {
            setSelected(true);
        }
    }, []);

    return (
        <div className={'input input-account'}>
            <label
                {...labelProps}
                className={cx('input-label', {
                    'label-selected': isSelected,
                })}
            >
                {' '}
                {labelTitle}{' '}
            </label>
            <input onBlur={onBlur} onFocus={onFocus} {...inputProps} />
            <small
                className={cx('input-info', { 'input-error': Boolean(error) })}
            >
                {error ? error : inputProps.info}
            </small>
        </div>
    );
}

Input.propTypes = {
    labelProps: PropTypes.object.isRequired,
    inputProps: PropTypes.object.isRequired,
    labelTitle: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default Input;
