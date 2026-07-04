import Link from 'next/link'
import { Card, Carousel, Swatches } from '@/components/composites'
import { Badge, Button, Heading, Progress, Switch } from '@/components/primitives'


const NEUTRAL_RAMP = [ 'paper', 'wash', 'line', 'ink-faint', 'ink-soft', 'ink' ]

const SLIDES = [
  {
    id: 'monochrome',
    content:
  <>
    <Heading level={ 6 }>01 · Color</Heading>
    <Heading level={ 2 }>Monochrome, by design</Heading>

    <p>
      True greys only. Color never arrives as a flat fill — it lives in
      photography, or in your hands via the theme customizer.
    </p>

    <Swatches label='Neutral ramp' tokens={ NEUTRAL_RAMP } />
  </>,
  },
  {
    id: 'typography',
    content:
  <>
    <Heading level={ 6 }>02 · Typography</Heading>
    <Heading level={ 2 }>Wide caps, light body</Heading>

    <p>
      Novecento Sans Wide carries the display voice — uppercase, tracked
      wide, never bolded for emphasis. Sofia Pro sets the body at a light
      300, and Montserrat covers subheadings.
    </p>

    <p>
      <Link href='/design-system#typography'>See the full specimen →</Link>
    </p>
  </>,
  },
  {
    id: 'components',
    content:
  <>
    <Heading level={ 6 }>03 · Components</Heading>
    <Heading level={ 2 }>Semantic to the bone</Heading>

    <p>
      Native elements, squared corners, hairline borders. Every control
      below is real — try them.
    </p>

    <div data-layout='cluster'>
      <Button variant='primary'>Primary</Button>
      <Button>Default</Button>
      <Badge variant='accent'>Badge</Badge>
      <Switch label='Switch' />
    </div>

    <Progress label='Demo progress' value={ 64 } />
  </>,
  },
  {
    id: 'tokens',
    content:
  <>
    <Heading level={ 6 }>04 · Tokens</Heading>
    <Heading level={ 2 }>One file, whole theme</Heading>

    <p>
      Every visual decision resolves to a custom property in
      {' '}
      <code>src/styles/tokens.css</code>
      {' '}
      — colors as adjustable oklch channels, one type scale, one spacing
      rhythm. Slide the channels on the design system page and watch the
      whole site follow.
    </p>

    <p>
      <Link href='/design-system#color'>Customize the palette →</Link>
    </p>
  </>,
  },
]

export default function HomePage () {
  return <div data-layout='stack'>
    <section data-hero>
      <Heading level={ 6 }>Design system · Portfolio</Heading>
      <Heading level={ 1 }>Hummingbird</Heading>

      <p>
        A monochrome design system reconstructed from the studio&apos;s 2015
        identity guide — semantic HTML, native elements, zero utility classes.
      </p>

      <p>
        <Link href='/design-system'>Explore the full design system →</Link>
      </p>
    </section>

    <Carousel label='Design system highlights' slides={ SLIDES } />

    <section>
      <Heading level={ 2 }>Principles</Heading>

      <div data-layout='cluster'>
        <Card title='Squared. Always.'>
          <p>
            Radius is a token set to zero. Hairline borders and whitespace do
            the separating; nothing floats on a shadow.
          </p>
        </Card>

        <Card title='The markup is the API'>
          <p>
            <code>button.primary</code>
            {' '}
            tells you what it is and where it lives. Selectors mirror semantic
            markup — no utility classes, no wrappers.
          </p>
        </Card>

        <Card title='Native first'>
          <p>
            <code>&lt;dialog&gt;</code>
            ,
            {' '}
            <code>&lt;details&gt;</code>
            , scroll-snap sliders, and
            {' '}
            <code>:user-invalid</code>
            {' '}
            ship accessibility for free. JavaScript only assists.
          </p>
        </Card>
      </div>
    </section>

    <section>
      <Heading level={ 2 }>In the box</Heading>

      <p>
        Thirteen primitives, ten composites, three layout landmarks, a typed
        reducer for global state, and a streaming AI chat endpoint — every one
        of them documented, with live examples, on the
        {' '}
        <Link href='/design-system'>design system page</Link>
        .
      </p>
    </section>
  </div>
}
