import cx from 'classnames';
import { useState } from 'react';

function Input({
    label = '',
    type = 'text',
    value = '',
    onChange = () => {},
    name = '',
    info = '',
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
            <small> {info} </small>
        </div>
    );
}

export default Input;
