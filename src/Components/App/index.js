import './style.scss';
import cx from 'classnames';
import Login from '../../Page/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Home from '../../Page/Home';
import { useSelector } from 'react-redux';
import Message from '../Message';
import Dashboard from '../../Page/Dashboard';
import NotFound from '../../Page/NotFound';
import MyAccount from '../../Page/MyAccount';
import CreateChat from '../../Page/CreateChat';
import JoinChat from '../../Page/JoinChat';
import MyRooms from '../../Page/MyRooms';
import ChatRoom from '../../Page/ChatRoom';

function App() {
    const { token } = useSelector((state) => state.user);
    return (
        <div className={cx('App', { bg: !Boolean(token) })}>
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                        {token ? <Redirect to={'/dashboard'} /> : <Home />}
                    </Route>
                    <Route exact path={'/connexion'}>
                        {token ? (
                            <Redirect to={'/dashboard'} />
                        ) : (
                            <Login page={'login'} />
                        )}
                    </Route>
                    <Route exact path={'/inscription'}>
                        {token ? (
                            <Redirect to={'/dashboard'} />
                        ) : (
                            <Login page={'signup'} />
                        )}
                    </Route>
                    <Route exact path={'/dashboard'}>
                        {token ? <Dashboard /> : <Redirect to={'/connexion'} />}
                    </Route>
                    <Route exact path={'/mon-compte'}>
                        {token ? <MyAccount /> : <Redirect to={'/connexion'} />}
                    </Route>
                    <Route exact path={'/creer-salon'}>
                        {token ? (
                            <CreateChat />
                        ) : (
                            <Redirect to={'/connexion'} />
                        )}
                    </Route>
                    <Route exact path={'/rejoindre-salon'}>
                        {token ? <JoinChat /> : <Redirect to={'/connexion'} />}
                    </Route>
                    <Route exact path={'/salons/'}>
                        {token ? <MyRooms /> : <Redirect to={'/connexion'} />}
                    </Route>
                    <Route exact path={'/salons/:name/:_id/'}>
                        {token ? <ChatRoom /> : <Redirect to={'/connexion'} />}
                    </Route>
                    <Route exact path={'*'}>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
            <Message />
        </div>
    );
}

export default App;
