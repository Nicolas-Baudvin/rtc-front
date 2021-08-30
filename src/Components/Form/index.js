import PropTypes from 'prop-types';
import Input from '../Input';
import './style.scss';
import cx from 'classnames';
import { VscLoading } from 'react-icons/vsc';

function Form({
    inputs,
    onSubmit,
    onChange,
    state,
    isLoading,
    errors,
    children,
}) {
    return (
        <form className={'form'} onSubmit={onSubmit} action="">
            {inputs.map((input, i) => (
                <Input
                    key={i}
                    inputProps={{
                        ...input.inputProps,
                        value: state[input.inputProps.name],
                        onChange: (e) => onChange(e, input.inputProps.name),
                    }}
                    labelTitle={input.labelTitle}
                    labelProps={input.labelProps}
                    error={errors[input.inputProps.name]}
                />
            ))}
            {children}

            <button className={cx('button', { 'button-loading': isLoading })}>
                {isLoading ? <VscLoading /> : 'Valider'}
            </button>
        </form>
    );
}

Form.propTypes = {
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            inputProps: PropTypes.shape({
                name: PropTypes.string.isRequired,
                info: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
            }),
            labelTitle: PropTypes.string.isRequired,
            labelProps: PropTypes.shape({
                htmlFor: PropTypes.string.isRequired,
            }),
        })
    ),
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
};

export default Form;
