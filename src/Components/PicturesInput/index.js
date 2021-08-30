import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './style.scss';

const images = [
    {
        url: `${process.env.PUBLIC_URL}/beard.svg`,
        alt: 'user chat image',
    },
    {
        url: `${process.env.PUBLIC_URL}/female-user.svg`,
        alt: 'user chat image',
    },
    {
        url: `${process.env.PUBLIC_URL}/user.svg`,
        alt: 'user chat image',
    },
    {
        url: `${process.env.PUBLIC_URL}/woman-teacher.svg`,
        alt: 'user chat image',
    },
];

function PicturesInput({ onClick }) {
    const [isSelected, setSelected] = useState({});
    const handleClick = (e, img) => {
        onClick(e, img);
        setSelected(img);
    };
    return (
        <div className={'images'}>
            <div className={'images-text'}>Choisis une image de profil</div>
            <div className={'images-container'}>
                {images.map((image, i) => (
                    <img
                        className={cx('images-item', {
                            'images-item-selected':
                                isSelected.url === image.url,
                        })}
                        onClick={(e) => handleClick(e, image)}
                        key={i}
                        src={image.url}
                        alt={image.alt}
                    />
                ))}
            </div>
        </div>
    );
}

PicturesInput.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default PicturesInput;
