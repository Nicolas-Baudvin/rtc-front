import cx from 'classnames';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function MenuItem({ Icon, title, isSelected, path }) {
    const history = useHistory();

    const onClick = () => history.push(path);

    return (
        <div onClick={onClick} className={'dashboard-menu__item'}>
            <h2>
                <Icon />
                {title}
            </h2>
            <div
                className={cx('dashboard-menu__item-color', {
                    grey: !isSelected,
                    blue: isSelected,
                })}
            />
        </div>
    );
}

MenuItem.propTypes = {
    Icon: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
};

export default MenuItem;
