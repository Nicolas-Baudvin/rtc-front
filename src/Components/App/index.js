import './style.scss';
import cx from 'classnames';
import Login from '../Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Home from '../Home';
import { useSelector } from 'react-redux';
import Message from '../Message';
import Dashboard from '../Dashboard';
import NotFound from '../NotFound';
import MyAccount from '../MyAccount';
import CreateChat from '../CreateChat';

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
