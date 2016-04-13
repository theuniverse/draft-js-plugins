import { Modifier, EditorState } from 'draft-js';

const applyStyle = (editorState, start, end, content, style) => {
  const currentSelectionState = editorState.getSelection();

  // get selection of the @mention search text
  const removeTextSelection = currentSelectionState.merge({
    anchorOffset: start,
    focusOffset: end,
  });

  let styledTextReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    removeTextSelection,
    content
  );

  const styledTextSelection = removeTextSelection.merge({
    anchorOffset: start,
    focusOffset: end - 2,
    hasFocus: false
  });

  styledTextReplacedContent = Modifier.applyInlineStyle(
    styledTextReplacedContent,
    styledTextSelection,
    style
  );

  const newEditorState = EditorState.push(
    editorState,
    styledTextReplacedContent,
    'apply-style',
  );
  return EditorState.forceSelection(newEditorState, styledTextReplacedContent.getSelectionAfter());
};

export default applyStyle;
