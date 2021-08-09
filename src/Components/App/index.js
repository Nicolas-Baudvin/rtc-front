import './style.scss';
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

function App() {
    const { token } = useSelector((state) => state.user);
    return (
        <div className="App">
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
                        <Dashboard />
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
