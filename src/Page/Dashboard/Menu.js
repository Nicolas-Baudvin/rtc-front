import MenuItem from './MenuItem';
import { menuItems } from './util';

function Menu() {
    return (
        <div className={'dashboard-menu'}>
            {menuItems.map((menuItem, i) => (
                <MenuItem
                    key={i}
                    Icon={menuItem.Icon}
                    title={menuItem.title}
                    isSelected={menuItem.isSelected}
                    path={menuItem.path}
                />
            ))}
        </div>
    );
}

export default Menu;
