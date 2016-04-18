import React, { Component } from 'react';
import { genKey } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';

import applyStyle from './modifiers/applyStyle';
import getSelectedBlock from './utils/getSelectedBlock';

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
        const selectedBlock = getSelectedBlock(editorState, selection);
        const blockText = selectedBlock.getText();

        let matchArr;
        if ((matchArr = syntax.exec(blockText)) !== null) { // eslint-disable-line
          let start = matchArr.index; // eslint-disable-line
          let end = start + matchArr[0].length; // eslint-disable-line

          let startStyle = selectedBlock.getInlineStyleAt(start);
          if (startStyle.has('CODE')) {
            return editorState;
          }

          let endStyle = selectedBlock.getInlineStyleAt(start);
          if (endStyle.has('CODE')) {
            return editorState;
          }

          let content = blockText.substring(start+1, end-1);
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
