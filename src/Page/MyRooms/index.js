import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { FaCrown } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { useEffect } from 'react';
import { getRooms } from '../../Store/Rooms/actions';
import './style.scss';

function MyRooms() {
    const dispatch = useDispatch();
    const { all, isLoading } = useSelector((state) => state.rooms);
    const { username } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getRooms());
    }, []);

    return (
        <div className={'roomsList'}>
            <Header page={'Mes Salons'} />
            <div className={'roomsList-list'}>
                <p>Cliquez sur le salon que vous voulez rejoindre</p>
                {all.map((room) => (
                    <div className={'roomsList-list__item'}>
                        <div>{room.name}</div>
                        <div>
                            {username === room.owner.username && <FaCrown />}
                            <MdClear />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyRooms;
