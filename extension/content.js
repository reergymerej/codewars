;(() => {
  console.log('extension is running')

  const injectScript = (content, src, onload) => {
    const script = document.createElement('script')
    if (src) {
      script.src = src
      script.addEventListener('load', onload)
    } else {
      script.text = content
    }
    document.documentElement.appendChild(script)
  }

  const installSocketIo = () => {
    return Promise.resolve()
    // This doesn't work since we get a different global.
    return new Promise(resolve => {
      const src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js'
      injectScript('', src, resolve)
    })
  }

  const injectNewCodeHandler = () => {
    // read from extension/injected.js
    injectScript(`
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
    `)
  }

  installSocketIo().then(() => {
    var socket = io('http://localhost')
    socket.on('message-from-server', function (data) {
      console.log('got data from message-from-server socket', data)
      document.dispatchEvent(new CustomEvent('newcode', { detail: data.code }))
    })

    injectNewCodeHandler()
  })
})()
