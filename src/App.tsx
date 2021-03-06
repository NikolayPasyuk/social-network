import React, {ComponentType} from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/app-reducer';
import store, {RootStateType} from './redux/redux-store';
import {Preloader} from './components/common/preloader/Preloader';
import './Reset.css';
import {withSuspense} from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import ('./components/Users/UsersContainer'));
const Music = React.lazy(() => import ('./components/Music/Music'));
const SettingsContainer = React.lazy(() => import ('./components/Settings/SettingsContainer'));
const LoginPage = React.lazy(() => import ('./components/Login/Login'));
const Page404 = React.lazy(() => import ('./components/Page404/Page404'));

type mapStatePropsType = {
    initialized: boolean
}

type mapDispatchPropsType = {
    initializeApp: () => void
}
export type AppPropsType = mapStatePropsType & mapDispatchPropsType


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div>
                <HeaderContainer/>
                <div className="main-wrapper">
                    <Navbar/>
                    <div className="main-content">
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={'/profile'}/>}/>
                            <Route path="/dialogs"
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?"
                                   render={withSuspense(ProfileContainer)}/>
                            <Route path="/users"
                                   render={withSuspense(UsersContainer)}/>
                            <Route path="/music"
                                   render={withSuspense(Music)}/>
                            <Route path="/settings"
                                   render={withSuspense(SettingsContainer)}/>
                            <Route path="/login"
                                   render={withSuspense(LoginPage)}/>
                            <Route path="/*" render={withSuspense(Page404)}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType): mapStatePropsType => {
    return {
        initialized: state.app.initialized
    }
}

let AppContainer = compose<ComponentType>(
    withRouter,
    connect<mapStatePropsType, mapDispatchPropsType, {}, RootStateType>(mapStateToProps, {initializeApp}))(App);

const SocialNetworkApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SocialNetworkApp;