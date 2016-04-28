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
