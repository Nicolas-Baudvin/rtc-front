import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';

function Header() {
    return (
        <header className={'dashboard-header'}>
            <div className={'dashboard-header-block'}>
                <div className={'dashboard-header-user'}>
                    <AiOutlineUser />
                    <div className={'dashboard-header-user__username'}>
                        Username
                    </div>
                </div>
                <div className={'dashboard-header-buttons'}>
                    <button>
                        <ImExit />
                    </button>
                    <button>
                        <AiOutlineMenu />
                    </button>
                </div>
            </div>
            <div className={'dashboard-header-block'}>
                <h1>Dashboard</h1>
            </div>
        </header>
    );
}

export default Header;
