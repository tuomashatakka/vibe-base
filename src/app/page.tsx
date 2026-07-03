import Link from 'next/link'
import { Chat } from '@/components/composites'
import { Card } from '@/components/composites/Card'
import { Disclosure, Heading } from '@/components/primitives'


export default function HomePage () {
  return <div data-layout='stack'>
    <section>
      <Heading level={ 1 }>Start here, delete freely.</Heading>

      <p>
        This scaffold is a starting shape, not a framework. Semantic HTML styled
        directly, one token file for the whole theme, a typed reducer for global
        state, and an AI chat endpoint already streaming. Everything else is yours.
      </p>
    </section>

    <hr />

    <section>
      <Heading level={ 2 }>What&apos;s wired</Heading>

      <div data-layout='cluster'>
        <Card title='Design system' footer={ <Link href='/style-guide'>Open style guide</Link> }>
          <p>
            Tokens in
            {' '}
            <code>src/styles/tokens.css</code>
            , element defaults
            in
            {' '}
            <code>base.css</code>
            , variants in
            {' '}
            <code>components.css</code>
            .
            No Tailwind, no Radix, no utility classes.
          </p>
        </Card>

        <Card title='Global state'>
          <p>
            Reducer + actions pattern in
            {' '}
            <code>src/lib/state</code>
            . Try the
            <strong> theme</strong>
            {' '}
            and
            <strong>panel</strong>
            {' '}
            buttons in the
            header — the panel is a parallel route slot.
          </p>
        </Card>

        <Card title='AI SDK'>
          <p>
            <code>src/app/api/chat/route.ts</code>
            {' '}
            streams Claude via the
            Vercel AI SDK. Set
            <code>ANTHROPIC_API_KEY</code>
            {' '}
            in
            <code> .env.local</code>
            {' '}
            and it just works.
          </p>
        </Card>
      </div>
    </section>

    <section>
      <Heading level={ 2 }>Chat</Heading>
      <Chat />
    </section>

    <section>
      <Heading level={ 2 }>Native, no JavaScript</Heading>

      <div data-layout='stack'>
        <Disclosure open name='faq' summary='Why semantic selectors?'>
          <p>
            Because
            {' '}
            <code>button.primary</code>
            {' '}
            tells you what it is and where it
            lives. The markup is the API; CSS reads like documentation.
          </p>
        </Disclosure>

        <Disclosure name='faq' summary='Why native elements?'>
          <p>
            <code>&lt;details&gt;</code>
            ,
            <code>&lt;dialog&gt;</code>
            , and friends ship
            accessibility, focus management, and keyboard support for free. These two
            disclosures form an accordion via the
            <code>name</code>
            {' '}
            attribute — zero JS.
          </p>
        </Disclosure>
      </div>
    </section>
  </div>
}
