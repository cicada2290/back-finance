'use client'

import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'
import { siteConfig } from '@/config/site'
import { title, subtitle } from '@/components/primitives'
import { GithubIcon } from '@/components/elements/Icons'

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-[80px]">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ size: 'lg', weight: 'bold' })}>
          Everyone&#039;s&nbsp;
        </h1>
        <br />
        <h1 className={title({ size: 'lg', weight: 'bold', color: 'yellow' })}>
          Favorite&nbsp;
        </h1>
        <h1 className={title({ size: 'lg', weight: 'bold' })}>DEX</h1>
        <br />
        <h2 className={subtitle({ class: 'mt-4', color: 'foreground' })}>
          Trade, earn, and own crypto on the all-in-one DEX
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          href={siteConfig.navItems[1].href}
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
        >
          Trade Now
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: 'bordered', radius: 'full' })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  )
}
