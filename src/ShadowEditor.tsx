import ReactDOM from 'react-dom'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

const ShadowDOM = () => {
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (container.current!.shadowRoot) return

        // Create a shadow DOM
        const outerShadowRoot = container.current!.attachShadow({ mode: 'open' })
        const style = document.createElement('style')
        style.textContent = `
        .editor-root {
            background-color: red;
        }
        `;
        outerShadowRoot.appendChild(style)
        const reactRoot = document.createElement('div')
        reactRoot.className = "editor-root"
        outerShadowRoot.appendChild(reactRoot)

        // Render the editor within the nested shadow DOM
        ReactDOM.render(<ShadowEditor />, reactRoot)
    })

    return <div className="editor-root" ref={container} />
}

const ShadowEditor = () => {
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
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <Slate editor={editor} value={value} onChange={value => setState(value)}>
            <Editable placeholder="Enter some plain text..." />
        </Slate>
    )
}


export default ShadowDOM