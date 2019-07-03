import React, { Component } from 'react'

const ThemeContext = React.createContext();

class ThemeProvider extends Component {

    state = {
        theme: 'light'
    }

    setTheme = theme => {
      console.log('new theme: ' + theme)
        this.setState({
            theme: theme
        });
    }

    sayHi = () => {
      console.log('hi');
    }
  

    
    render () {
        return (
          <ThemeContext.Provider
            value={{
              theme: this.state.theme,
              setTheme: this.setTheme
            }}
          >
            {this.props.children}
          </ThemeContext.Provider>
        )
      }
    
}

const ThemeConsumer = ThemeContext.Consumer

export default ThemeProvider
export { ThemeConsumer }

