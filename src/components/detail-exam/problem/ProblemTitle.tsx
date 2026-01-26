interface ProblemTitleProps {
  index: number
  title: string
}

export default function ProblemTitle({ index, title }: ProblemTitleProps) {
  return (
    <section className="py-3">
      <p className="text-xl leading-[1.2]">
        {index}. {title}
      </p>
    </section>
  )
}
