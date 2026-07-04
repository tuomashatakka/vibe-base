'use client'

import { useState } from 'react'
import { Alert, Breadcrumb, Card, Field, SearchField, Tabs } from '@/components/composites'
import {
  Badge, Button, Checkbox, Dialog, Disclosure, Heading, Input,
  Progress, Radio, Select, Switch, Textarea,
} from '@/components/primitives'


const SWATCHES = [
  'ink', 'ink-soft', 'ink-faint', 'line', 'wash', 'paper',
  'accent', 'accent-strong', 'accent-wash', 'danger', 'success',
]

const PLANS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
]

export default function StyleGuidePage () {
  const [ dialogOpen, setDialogOpen ] = useState(false)
  const [ plan, setPlan ]             = useState('pro')
  const [ terms, setTerms ]           = useState(false)
  const [ delivery, setDelivery ]     = useState('standard')
  const [ notify, setNotify ]         = useState(true)

  return <div data-layout='stack'>
    <section>
      <Breadcrumb
        items={ [
          { label: 'Home', href: '/' },
          { label: 'Style guide' },
        ] } />

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
      <Heading level={ 2 }>Badges</Heading>

      <div data-layout='cluster'>
        <Badge>Neutral</Badge>
        <Badge variant='accent'>Accent</Badge>
        <Badge variant='success'>Success</Badge>
        <Badge variant='danger'>Danger</Badge>
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Forms</Heading>

      <div data-layout='stack'>
        <Field label='Email' htmlFor='sg-email' hint='We never share it.'>
          <Input required id='sg-email' type='email' placeholder='you@example.com' />
        </Field>

        <Field label='Password' htmlFor='sg-pass' error='Must be at least 8 characters.'>
          <Input id='sg-pass' type='password' placeholder='••••••••' />
        </Field>

        <Field label='Message' htmlFor='sg-msg'>
          <Textarea id='sg-msg' placeholder='Tell us more…' />
        </Field>

        <Field label='Plan' htmlFor='sg-plan'>
          <Select
            id='sg-plan'
            options={ PLANS }
            value={ plan }
            onChange={ event => setPlan(event.target.value) } />
        </Field>

        <fieldset>
          <legend>Delivery</legend>

          <div data-layout='stack'>
            <Radio
              name='delivery'
              value='standard'
              label='Standard (3–5 days)'
              checked={ delivery === 'standard' }
              onChange={ event => setDelivery(event.target.value) } />

            <Radio
              name='delivery'
              value='express'
              label='Express (next day)'
              checked={ delivery === 'express' }
              onChange={ event => setDelivery(event.target.value) } />
          </div>
        </fieldset>

        <Checkbox
          label='I agree to the terms'
          checked={ terms }
          onChange={ event => setTerms(event.target.checked) } />

        <Switch
          label='Email notifications'
          checked={ notify }
          onChange={ event => setNotify(event.target.checked) } />

        <SearchField onSearch={ query => console.info('search:', query) } />
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Progress</Heading>

      <div data-layout='stack'>
        <Progress label='Upload progress' value={ 64 } />
        <Progress label='Loading' />
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Alerts</Heading>

      <div data-layout='stack'>
        <Alert title='Heads up'>
          <p>
            An informational callout. Uses
            <code>role=&quot;status&quot;</code>
            .
          </p>
        </Alert>

        <Alert variant='success' title='Saved'>
          <p>Your changes were written successfully.</p>
        </Alert>

        <Alert variant='danger' title='Something broke'>
          <p>
            A destructive callout announced via
            <code>role=&quot;alert&quot;</code>
            .
          </p>
        </Alert>
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Tabs</Heading>

      <Tabs
        label='Documentation sections'
        tabs={ [
          { id: 'overview', label: 'Overview', content: <p>Arrow keys move between tabs; each panel is a labelled landmark.</p> },
          { id: 'install', label: 'Install', content: <p>Install dependencies, then start the dev server.</p> },
          { id: 'deploy', label: 'Deploy', content: <p>Push to the default branch for GitHub Pages, or import to Vercel.</p> },
        ] } />
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
