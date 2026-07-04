'use client'

import { useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button } from '@/components/primitives'


interface Slide {
  id:      string
  content: ReactNode
}

interface CarouselProps {
  slides: Slide[]
  label:  string // names the carousel for assistive tech
}

/**
 * Scroll-snap slider: the track is a plain scrollable list, so swipe,
 * trackpad, and keyboard scrolling all work natively — the buttons
 * only assist.
 */
export const Carousel: FC<CarouselProps> = ({ slides, label }) => {
  const track                   = useRef<HTMLUListElement>(null)
  const [ current, setCurrent ] = useState(0)

  const goTo = (index: number) => {
    const element = track.current
    if (!element)
      return

    const next = Math.min(Math.max(index, 0), slides.length - 1)
    element.scrollTo({ left: next * element.clientWidth, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const element = track.current
    if (!element || element.clientWidth === 0)
      return

    setCurrent(Math.round(element.scrollLeft / element.clientWidth))
  }

  return <section
    aria-roledescription='carousel'
    aria-label={ label }
    data-component='carousel'>
    <ul ref={ track } onScroll={ handleScroll }>
      {slides.map((slide, index) =>
        <li
          key={ slide.id }
          aria-roledescription='slide'
          aria-label={ `${index + 1} of ${slides.length}` }>
          {slide.content}
        </li>)}
    </ul>

    <footer>
      <Button
        variant='ghost'
        size='small'
        disabled={ current === 0 }
        onClick={ () => goTo(current - 1) }>
        ← Prev
      </Button>

      <small aria-hidden='true'>
        {String(current + 1).padStart(2, '0')}
        {' / '}
        {String(slides.length).padStart(2, '0')}
      </small>

      <Button
        variant='ghost'
        size='small'
        disabled={ current === slides.length - 1 }
        onClick={ () => goTo(current + 1) }>
        Next →
      </Button>
    </footer>
  </section>
}

Carousel.displayName = 'Carousel'
