export default function ProblemExplain({ explain }: { explain: string }) {
  return (
    <section className="bg-grey-50 rounded-[12px] px-9 py-5">
      <div className="flex flex-col gap-1">
        <p>해설</p>
        <p className="text-grey-600">{explain}</p>
      </div>
    </section>
  )
}
