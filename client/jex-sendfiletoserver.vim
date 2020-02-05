if exists("g:loaded_jexsendfiletoserver")
  finish
endif
let g:loaded_jexsendfiletoserver = 1

function JexSend(file)
  let l:url = "http://localhost/notify"
  let l:command = "curl -X POST " . l:url
  let l:command .= " -H 'Cache-Control: no-cache'"
  let l:command .= " -d @'" . a:file . "'"
  exec "silent !" . l:command
endfunction

function JexSendFileToServer()
  let l:file = expand('%:p')
  call JexSend(l:file)
endfunction

command! -nargs=0 JCW exec JexSendFileToServer()
