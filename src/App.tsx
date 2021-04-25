import { useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact }  from 'slate-react'

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setState] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{
        text: 'A line of text in a paragraph.',
        bold: true,
        italic: true,
      }],
    },
  ])
  // Render the Slate context.
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setState(newValue)
      }}
    >
      <Editable />
    </Slate>
  )
}

export default App;
