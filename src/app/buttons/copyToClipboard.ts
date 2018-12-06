export function copyToClipboard(text: string) {
  withTemporaryTextarea(el => {
    el.value = text

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      selectOnIOS(el)
    } else {
      selectOnAndroid(el)
    }

    document.execCommand("copy")
  })
}

function selectOnIOS(el: HTMLTextAreaElement) {
  // save current contentEditable/readOnly status
  const editable = el.contentEditable
  const readOnly = el.readOnly

  // convert to editable with readonly to stop iOS keyboard opening
  el.contentEditable = "true"
  el.readOnly = true

  // create a selectable range
  const range = document.createRange()
  range.selectNodeContents(el)

  // select the range
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  el.setSelectionRange(0, 999999)

  // restore contentEditable/readOnly to original state
  el.contentEditable = editable
  el.readOnly = readOnly
}

function selectOnAndroid(el: HTMLTextAreaElement) {
  el.select()
}

function withTemporaryTextarea(action: (el: HTMLTextAreaElement) => void) {
  const el = document.createElement("textarea")
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)

  action(el)

  document.body.removeChild(el)
}
