import React from 'react';
import CharacterList from './CharacterList/CharacterList';
import Character from './Character/Character';
import CharacterFav from "./CharacterFav/CharacterFav";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


class App extends React.Component{
    render(){
        return(
        <div className="App">
            <header>
                <h1 className="main-title">My Marvels</h1>
                <ul className="main-nav">
                    <li><a href="/" className={window.location.pathname === "/" ? "active" : "" }>Home</a></li>
                    <li><a href="/favorites" className={window.location.pathname === "/favorites" ? "active" : "" }>Favorites</a></li>
                </ul>

            </header>
            <Router>
                <Switch>
                    <Route exact path="/" component={CharacterList} />
                    <Route exact path="/character/:id" component={Character} />
                    <Route exact path="/favorites" component={CharacterFav} />
                </Switch>
            </Router>
        </div>
    )
  }
}

export default App;
