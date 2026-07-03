'use client'

import { useState } from 'react'
import { Card, SearchField } from '@/components/composites'
import { Button, Dialog, Disclosure, Heading, Input } from '@/components/primitives'


const SWATCHES = [
  'ink', 'ink-soft', 'ink-faint', 'line', 'wash', 'paper',
  'accent', 'accent-strong', 'accent-wash', 'danger', 'success',
]

export default function StyleGuidePage () {
  const [ dialogOpen, setDialogOpen ] = useState(false)

  return <div data-layout='stack'>
    <section>
      <Heading level={ 1 }>Style guide</Heading>

      <p>
        Every visual decision below resolves to
        {' '}
        <code>src/styles/tokens.css</code>
        .
        Edit that file, watch everything follow.
      </p>
    </section>

    <section>
      <Heading level={ 2 }>Color</Heading>

      <div data-layout='cluster'>
        {SWATCHES.map(token =>
          <figure key={ token } data-token={ token }>
            <div style={{ background: `var(--${token})` }} />
            <figcaption>--{token}</figcaption>
          </figure>)}
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Type</Heading>
      <Heading level={ 1 }>Display / h1</Heading>
      <Heading level={ 2 }>Section / h2</Heading>
      <Heading level={ 3 }>Subsection / h3</Heading>
      <Heading level={ 6 }>Eyebrow / h6</Heading>

      <p>
        Body copy caps at
        <code>--measure</code>
        {' '}
        so lines stay readable.
      </p>

      <small>Small print sits one step down and one shade softer.</small>
    </section>

    <section>
      <Heading level={ 2 }>Buttons</Heading>

      <div data-layout='cluster'>
        <Button>Default</Button>
        <Button variant='primary'>Primary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='danger'>Danger</Button>
        <Button variant='primary' size='small'>Small</Button>
        <Button disabled>Disabled</Button>
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Forms</Heading>

      <div data-layout='stack'>
        <div>
          <label htmlFor='sg-email'>Email</label>
          <Input required id='sg-email' type='email' placeholder='you@example.com' />
        </div>

        <SearchField onSearch={ query => console.info('search:', query) } />
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Native elements</Heading>

      <div data-layout='stack'>
        <Disclosure summary='Disclosure (details/summary)'>
          <p>Open and close with the keyboard. Nothing imported, nothing polyfilled.</p>
        </Disclosure>

        <div data-layout='cluster'>
          <Button variant='primary' onClick={ () => setDialogOpen(true) }>
            Open dialog
          </Button>
        </div>

        <Dialog
          open={ dialogOpen }
          title='Native dialog'
          footer={
            <>
              <Button variant='ghost' onClick={ () => setDialogOpen(false) }>Cancel</Button>
              <Button variant='primary' onClick={ () => setDialogOpen(false) }>Confirm</Button>
            </>
          }
          onClose={ () => setDialogOpen(false) }>
          <p>
            Focus trapping,
            {' '}
            <kbd>Esc</kbd>
            {' '}
            to close, and the backdrop are all
            browser-provided.
          </p>
        </Dialog>
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Card</Heading>

      <div data-layout='cluster'>
        <Card title='Card title' footer={ <Button size='small'>Action</Button> }>
          <p>
            Header, body, and footer map to
            <code>article &gt; header / div / footer</code>
            .
          </p>
        </Card>
      </div>
    </section>
  </div>
}
