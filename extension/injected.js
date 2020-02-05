;(() => {
  document.addEventListener('newcode', (event) => {
    const newCode = event.detail
    try {
      const editor = document.querySelector('.CodeMirror').CodeMirror
      editor.doc.setValue(newCode)
      document.querySelector('#validate_btn').click()
    } catch (err) {
      console.error(err)
    }
  })
})()
