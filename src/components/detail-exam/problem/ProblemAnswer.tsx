export function ProblemAnswer({ answer }: { answer: string | string[] }) {
  const displayAnswer = Array.isArray(answer) ? answer.join(', ') : answer
  return (
    <section>
      <p>
        정답 : <span className="text-primary-700">{displayAnswer}</span>
      </p>
    </section>
  )
}
