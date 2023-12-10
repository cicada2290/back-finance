import TitleText from '@/components/elements/typography/TitleText'

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        <div className="pb-10">
          <TitleText text="MyPage" />
        </div>
        {children}
      </div>
    </section>
  )
}
