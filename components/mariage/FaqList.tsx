'use client'

import { useState } from 'react'

type Item = { q: string; a: string }

export function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="faq-wrap">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-plus" aria-hidden="true" />
            </button>
            <div className="faq-a" id={`faq-a-${i}`} role="region">
              <p className="faq-a-inner">{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
