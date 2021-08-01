import cx from 'classnames';
import { useState } from 'react';

function Input({
    label = '',
    type = 'text',
    value = '',
    onChange = () => {},
    name = '',
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
                onChange={onChange(name)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={value}
                type={type}
            />
        </div>
    );
}

export default Input;
