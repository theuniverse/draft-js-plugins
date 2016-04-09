import { Modifier, EditorState } from 'draft-js';
import getSearchText from '../utils/getSearchText';

const applyStyle = (editorState, style) => {
  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState);

  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    'hahaha',
    null,
    null
  );

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-mention',
  );
  return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
};

export default addMention;
