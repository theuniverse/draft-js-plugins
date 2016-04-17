import createMarkupStrategy from './createMarkupStrategy';
import createMarkupComponent from './createMarkupComponent';
import { Map } from 'immutable';

const callbacks = {
  keyBindingFn: Map(),
  handleKeyCommand: Map(),
  onTab: Map(),
  onEscape: Map(),
  handleReturn: Map(),
  onChange: Map(),
};

const markupPlugin = (config = {}) => {
  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  /*const mentionSearchProps = {
  ariaProps,
  callbacks,
  mentions: config.mentions
  };*/

  const decorators = (config.rules || []).map(rule => {
    const style = rule.get('style');
    const syntax = rule.get('syntax');
    const markupComponentProps = {
      syntax,
      style,
      callbacks
    };

    return {
      strategy: createMarkupStrategy(rule.get('syntax')),
      component: createMarkupComponent(markupComponentProps)
    };
  });

  return {
    pluginProps: {
      decorators: decorators,
      /*getEditorProps: () => {
      const ariaHasPopup = ariaProps.ariaHasPopup.some((entry) => entry);
      const ariaExpanded = ariaProps.ariaExpanded.some((entry) => entry);
      return {
      role: 'combobox',
      ariaAutoComplete: 'list',
      ariaHasPopup: ariaHasPopup ? 'true' : 'false',
      ariaExpanded: ariaExpanded ? 'true' : 'false',
      ariaActiveDescendantID: ariaProps.ariaActiveDescendantID.first(),
      ariaOwneeID: ariaProps.ariaOwneeID.first(),
      };
      },*/

      onTab: (keyboardEvent) => callbacks.onTab.forEach((onTab) => onTab(keyboardEvent)),
      onEscape: (keyboardEvent) => callbacks.onEscape.forEach((onEscape) => onEscape(keyboardEvent)),
      handleReturn: (keyboardEvent) => (
        callbacks.handleReturn
        .map((handleReturn) => handleReturn(keyboardEvent))
        .find((result) => result === true)
      ),
      onChange: (editorState) => {
        let newEditorState = editorState;
        if (callbacks.onChange.size !== 0) {
          callbacks.onChange.forEach((onChange) => {
            newEditorState = onChange(editorState);
          });
        }

        return newEditorState;
      }
    }
  };
};

export default markupPlugin;
