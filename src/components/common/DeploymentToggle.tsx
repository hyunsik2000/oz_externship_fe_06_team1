type Props = {
  checked: boolean
  onChange: (value: boolean) => void
}

export default function DeploymentToggle({ checked, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
        checked ? 'bg-green-500' : 'bg-grey-300',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-4' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}
