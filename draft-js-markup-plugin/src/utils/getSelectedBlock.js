const getSelectedBlock = (editorState, selection) => {
  const anchorKey = selection.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  return currentContent.getBlockForKey(anchorKey);
};

export default getSelectedBlock;
