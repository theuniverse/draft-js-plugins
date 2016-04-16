import { Modifier, EditorState, RichUtils } from 'draft-js';

const applyStyle = (editorState, start, end, content, style) => {
  const currentSelectionState = editorState.getSelection();
  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const cursorPos = currentSelectionState.getAnchorOffset();

  let styledContentState = Modifier.applyInlineStyle(
    editorState.getCurrentContent(),
    currentSelectionState.merge({
      anchorOffset: start + 1,
      focusOffset: end - 1
    }),
    style
  );
  styledContentState = Modifier.removeRange(
    styledContentState,
    currentSelectionState.merge({
      anchorOffset: end - 1,
      focusOffset: end
    }),
    'forward'
  );
  styledContentState = Modifier.removeRange(
    styledContentState,
    currentSelectionState.merge({
      anchorOffset: start,
      focusOffset: start + 1
    }),
    'forward'
  );

  const newEditorState = EditorState.push(
    editorState,
    styledContentState,
    'apply-style',
  );

  const newCursorPos = ((cursorPos - 1) === start ? start : end - 2);
  const lastTextSelection = currentSelectionState.merge({
    anchorOffset: newCursorPos,
    focusOffset: newCursorPos
  });

  const finalEditorState = EditorState.set(
    EditorState.forceSelection(
      newEditorState,
      lastTextSelection
    ),
    {
      inlineStyleOverride: currentInlineStyle
    }
  )

  return finalEditorState;
};

export default applyStyle;
