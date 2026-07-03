'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { Button } from '@/components/primitives'
import { setTheme, togglePanel, useAppState, useDispatch } from '@/lib/state'


export const Header: FC = () => {
  const { theme } = useAppState()
  const dispatch  = useDispatch()

  const cycleTheme = () => {
    const next = theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system'
    dispatch(setTheme(next))
  }

  return <header>
    <Link href='/'>
      <strong>vibe-scaffold</strong>
    </Link>

    <nav aria-label='Main'>
      <Link href='/'>Home</Link>
      <Link href='/style-guide'>Style guide</Link>
    </nav>

    <menu>
      <li>
        <Button variant='ghost' size='small' onClick={ cycleTheme }>
          theme: {theme}
        </Button>
      </li>

      <li>
        <Button variant='ghost' size='small' onClick={ () => dispatch(togglePanel()) }>
          panel
        </Button>
      </li>
    </menu>
  </header>
}

Header.displayName = 'Header'
