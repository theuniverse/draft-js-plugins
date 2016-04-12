import React, { Component } from 'react';
import { genKey } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';

import getSearchText from './utils/getSearchText';

export default (config = {}) => {
  class MarkupComponnt extends Component {
    componentWillMount() {
      this.key = genKey();
      this.props.callbacks.onChange = this.props.callbacks.onChange.set(this.key, this.onEditorStateChange);
    };

    componentWillUnmount() {
      this.props.callbacks.onChange = this.props.callbacks.onChange.delete(this.key);
    };

    onEditorStateChange(editorState) {
      const selection = editorState.getSelection();
      const { word } = getSearchText(editorState, selection);
      console.log(word);
      return editorState;
    };

    render() {
      return (
        <span> { this.props.children } </span>
      );
    };
  };

  return decorateComponentWithProps(MarkupComponnt, config);
};
