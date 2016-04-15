import { Modifier, EditorState, RichUtils } from 'draft-js';

const applyStyle = (editorState, start, end, content, style) => {
  const currentSelectionState = editorState.getSelection();
  const cursorPos = currentSelectionState.getAnchorOffset();

  const styledTextSelection = currentSelectionState.merge({
    anchorOffset: start + 1,
    focusOffset: end - 1
  });

  const styledEditorState = RichUtils.toggleInlineStyle(
    EditorState.acceptSelection(
      editorState,
      styledTextSelection
    ),
    style
  );

  const styledContentState = styledEditorState.getCurrentContent();
  let finalContentState = Modifier.removeRange(
    styledContentState,
    currentSelectionState.merge({
      anchorOffset: end - 1,
      focusOffset: end
    }),
    'forward'
  );
  finalContentState = Modifier.removeRange(
    finalContentState,
    currentSelectionState.merge({
      anchorOffset: start,
      focusOffset: start + 1
    }),
    'forward'
  );

  const newEditorState = EditorState.push(
    styledEditorState,
    finalContentState,
    'apply-style',
  );

  const newCursorPos = ((cursorPos - 1) === start ? start : end - 2);
  const lastTextSelection = styledTextSelection.merge({
    anchorOffset: newCursorPos,
    focusOffset: newCursorPos
  });

  return EditorState.forceSelection(newEditorState, lastTextSelection);
};

export default applyStyle;
