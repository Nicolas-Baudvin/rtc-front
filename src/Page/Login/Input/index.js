import cx from 'classnames';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Input({ input, page = 'signup', errors = {}, onChange, value }) {
    const { name, label, type, info } = input;
    const [isSelected, setSelected] = useState(false);

    const handleBlur = () => {
        if (!value) {
            setSelected(false);
        }
    };

    const handleFocus = () => {
        setSelected(true);
    };

    return (
        <div className={'input'}>
            <label
                className={cx('', { 'label-selected': isSelected })}
                htmlFor={name}
            >
                {label}
            </label>
            <input
                name={name}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={value}
                type={type}
            />
            {page === 'signup' && (
                <small
                    className={cx('input-info', {
                        'input-info-errors': Boolean(errors[name]),
                    })}
                >
                    {errors[name] || info}
                </small>
            )}
        </div>
    );
}

Input.propTypes = {
    onChange: PropTypes.func,
    page: PropTypes.string,
    value: PropTypes.string,
    errors: PropTypes.shape({
        email: PropTypes.string,
        username: PropTypes.string,
        password: PropTypes.string,
        confPass: PropTypes.string,
    }),
    input: PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        info: PropTypes.string,
    }).isRequired,
};

export default Input;
