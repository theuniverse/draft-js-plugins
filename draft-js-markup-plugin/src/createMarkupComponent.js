import React, { Component } from 'react';
import { genKey } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';

import applyStyle from './modifiers/applyStyle';
import getBlockText from './utils/getBlockText';

export default (config = {}) => {
  class MarkupComponnt extends Component {
    componentWillMount() {
      this.key = genKey();
    };

    componentDidMount() {
      const editorStateFunc = this.onEditorStateChange(this.props.syntax, this.props.style);
      this.props.updateEditorState(editorStateFunc(this.props.getEditorState()));
    };

    componentWillUnmount() {
    };

    onEditorStateChange(syntax, style) {
      return function(editorState) {
        const selection = editorState.getSelection();
        const word = getBlockText(editorState, selection);

        let matchArr;
        if ((matchArr = syntax.exec(word)) !== null) { // eslint-disable-line
          let start = matchArr.index; // eslint-disable-line
          let end = start + matchArr[0].length;
          let content = word.substring(start+1, end-1);
          let newEditorState = editorState;
          return applyStyle(newEditorState, start, end, content, style);
        }

        return editorState;
      };
    };

    render() {
      return (
        <span> { this.props.children } </span>
      );
    };
  };

  return decorateComponentWithProps(MarkupComponnt, config);
};
