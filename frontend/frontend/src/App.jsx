import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { UserProvider } from './components/Context/UserContext';
import Header from './components/Header/Header';

const Signup = React.lazy(() => import('./components/View/Signup'));
const SignIn = React.lazy(() => import('./components/View/SignIn'));
const PokeManList =  React.lazy(() => import('./components/PokeManList'));
const Home =  React.lazy(() => import('./components/Home/Home'));

function App() {
 
  return (
    <UserProvider>
      <Router>
          <Route>
            <Header/>
          </Route>
        <Switch>
          <Route>
            <Suspense fallback={<h1>Loading ....</h1>}>
              <Route exact path="/" component={Signup} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/api" component={PokeManList} />
              <Route exact path="/home" component={Home} />
              {/* <Route exact path="/table" component={Table} /> */}
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
