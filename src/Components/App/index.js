import './style.scss';
import Login from '../Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={'/connexion'}>
                        <Login page={'login'} />
                    </Route>
                    <Route exact path={'/inscription'}>
                        <Login page={'signup'} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
