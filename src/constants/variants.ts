import { cva } from 'class-variance-authority'

export const modalVariants = cva(
  'relative flex flex-col bg-white w-full overflow-hidden transition-all duration-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)]',
  {
    variants: {
      size: {
        sm: 'max-w-[400px] rounded-2xl',
        md: 'max-w-[600px] rounded-xl',
        lg: 'max-w-[900px] rounded-xl',
        full: 'max-w-[95vw] h-[90vh] rounded-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)
