import TitleText from '@/components/elements/typography/TitleText'

export default function LiquidityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <div className="pb-10">
          <TitleText text="Liquidity" />
          <p className="pt-5">A fixed deposit of 10 XRP is possible.</p>
        </div>
        {children}
      </div>
    </section>
  )
}
