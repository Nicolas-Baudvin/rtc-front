import cx from 'classnames';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Input({
    label = '',
    type = 'text',
    value = '',
    onChange = () => {},
    name = '',
    info = '',
    page = 'signup',
}) {
    const [isSelected, setSelected] = useState(false);

    const handleBlur = () => {
        setSelected(false);
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
            {page === 'signup' && <small> {info} </small>}
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    info: PropTypes.string,
    page: PropTypes.string,
};

export default Input;
