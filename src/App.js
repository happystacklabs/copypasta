import React, { Component } from 'react';
import { TextInput, Icon, Text } from '@happystack/kit';
import './App.css';
import emojis from './emojis.json';
import Panel from './Panel';


// electron imports
const electron = window.require('electron');
const fs = electron.remote.require('fs'); // eslint-disable-line no-unused-vars
const { clipboard, ipcRenderer } = electron; // eslint-disable-line no-unused-vars


function flatten(array) {
  array.unshift([]);
  return array.reduce((prev, category) => [...prev, ...category.emojis]);
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  onCopy = (emoji) => {
    // copy(emoji);
    clipboard.clear();
    clipboard.writeText(emoji);
    ipcRenderer.send('hide-window');
  };


  onSearchChange = (event) => {
    this.setState({ [event.name]: event.value });
  }

  getEmojis = () => {
    const emojisResult = {};
    const tempEmojis = flatten([...emojis]);

    if (this.state.search !== '') {
      // search for the term
      emojisResult.category = 'results';
      // filter the array with the results
      emojisResult.emojis = tempEmojis.filter((emoji) => {
        // check all they keyword in each emoji
        for (let i = 0; i < emoji.keywords.length; i += 1) {
          // check if the term is inside the keyword
          if (emoji.keywords[i].includes(this.state.search)) {
            return true;
          }
        }
        return false;
      });
      return emojisResult.emojis.length === 0 ? [] : [emojisResult];
    }
    return emojis;
  };

  render() {
    const emojisArray = this.getEmojis();
    return (
      <div className="app">
        <div className="app__search">
          <TextInput name="search" id="search" value={this.state.search} onChange={this.onSearchChange} placeholder="Search" />
          <Icon name="search" className="app__search-icon" color="ink-light" />
        </div>
        <div className="app__content">
          {emojisArray.length !== 0 ?
            emojisArray.map((category, index) => ((
              <Panel category={category} index={index} onCopy={this.onCopy} />
            )))
            :
            <div className="app__search-empty">
              <span className="app__empty-plate">🍽</span>
              <Text element="h1" size="display-large" color="ink-light">No Results.</Text>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
