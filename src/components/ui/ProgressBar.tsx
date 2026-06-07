const steps = ['Datos', 'Fotos', 'Confirmación']

interface Props {
  active: 0 | 1 | 2
  /** Marca todos los pasos como completados (paso final) */
  completed?: boolean
}

export default function ProgressBar({ active, completed = false }: Props) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10" aria-label="Progreso del pedido">
      {steps.map((label, i) => {
        const isDone = completed || i < active
        const isActive = !completed && i === active
        const isLast = i === steps.length - 1

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isActive || isDone
                    ? 'bg-brown text-cream'
                    : 'bg-cream border border-sand text-sand'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isActive || isDone ? 'text-brown' : 'text-sand'
                }`}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`w-12 sm:w-16 h-px mb-5 mx-1 transition-colors ${
                  isDone ? 'bg-brown/40' : 'bg-sand/40'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
