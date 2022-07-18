import React, { Component } from 'react';
import Login from './context/Login';
import MoviePage from './context/MoviePage';
import UserContext from './context/UserContext';
import CartContext from './context/cardContext';

class App extends Component {
  handleLoggedIn = (username) => {
    console.log("Getting the user: " + username);
    const user = { name: "Orange" };
    this.setState({ currentUser: user });
  }
  state = { currentUser: null } 
  render() { 
    return ( 
    <CartContext.Provider value={{ cart: [] }}>
      <UserContext.Provider value={{currentUser: this.state.currentUser, onLoggedIn: this.handleLoggedIn}}>
        <div>
          <MoviePage />
          <Login />
        </div>
      </UserContext.Provider>
    </CartContext.Provider>
    );
  }
}
 
export default App;