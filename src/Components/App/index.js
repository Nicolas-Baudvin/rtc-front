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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
