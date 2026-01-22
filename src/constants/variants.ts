import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md font-bold transition-colors remove-focus-outline',
  {
    variants: {
      variant: {
        default: 'bg-grey-100 text-grey-600',
        primary: 'bg-primary-50 text-primary-600',
        success: 'bg-success-100 text-success-400',
        danger: 'bg-error-100 text-error-400',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0.5 h-5',
        md: 'text-sm px-2.5 py-1 h-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold transition-all remove-focus-outline disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-700 text-white hover:opacity-90',
        secondary: 'bg-grey-400 text-white hover:opacity-90',
        outline:
          'border border-grey-300 bg-white text-grey-600 hover:bg-grey-50',
        confirm: 'bg-primary-600 text-white hover:opacity-90',
        success: 'bg-success-400 text-white hover:opacity-90',
        warning: 'bg-warning-400 text-white hover:opacity-90',
        danger: 'bg-error-400 text-white hover:opacity-80',
        ghost: 'bg-transparent text-grey-600 hover:bg-grey-100',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-6 w-6 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

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
