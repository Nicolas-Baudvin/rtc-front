import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { FaCrown } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { useEffect } from 'react';
import { getRooms } from '../../Store/Rooms/actions';

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
                {all.map((room) => (
                    <div className={'roomsList-list__item'}>
                        <div>{room.name}</div>
                        <div>
                            {username === room.owner.username && <FaCrown />}
                            <AiOutlineStar />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyRooms;
