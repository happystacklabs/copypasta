import React from 'react';
import { Text } from '@happystack/kit';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './App.css';


const propTypes = {
  category: PropTypes.array, // eslint-disable-line
  index: PropTypes.number,
};


const defaultProps = {
  category: undefined,
  index: undefined,
};


export const Panel = props => (
  <div>
    <Text
      className={classNames({ 'app__list-category--first': props.index === 0 }, 'app__list-category')}
      element="h2"
      size="sub-heading"
    >
      {props.category.category}
    </Text>
    <div className="app__list-panel">
      <ul className="app__list-ul">
        {props.category.emojis.map(emoji => ((
          <li className="app__list-panel-li" key={emoji.id}>
            <div
              className={classNames(emoji.id, 'app__list-panel-symbol')}
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={() => { props.onCopy(emoji.symbol); }}
            >
              <img className="copypasta__img" src={emoji.image} alt={emoji.symbol} />
            </div>
          </li>
        )))}
      </ul>
      <div className="clear" />
    </div>
  </div>
);


Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;


export default Panel;
