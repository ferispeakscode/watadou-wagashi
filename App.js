import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const { persistor, store } = ConfigureStore();

let customFonts = {
  'Kaushan-Script': require('./assets/fonts/KaushanScript-Regular.ttf')
}

export default class App extends Component {
  state = {
    fontsLoaded: false
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({fontsLoaded: true});
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render(){
    if (this.state.fontsLoaded) {
      return(
        <Provider store={store}>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}>
            <Main />
          </PersistGate>
        </Provider>
      );
    } else {
      return <AppLoading />;
    }
  }
}