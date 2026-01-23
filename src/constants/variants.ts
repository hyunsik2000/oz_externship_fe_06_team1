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

export const inputVariants = cva(
  'flex w-full rounded-md border bg-white px-3 py-2 text-sm transition-all outline-none placeholder:text-grey-400 disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-400',
  {
    variants: {
      status: {
        default: 'border-grey-300 focus:border-primary-500',
        error: 'border-error-400 focus:border-error-400',
      },
      size: {
        md: 'h-11',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      status: 'default',
      size: 'md',
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

export const toastVariants = cva(
  'relative flex items-center w-full max-w-[400px] bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all animate-in slide-in-from-right-5',
  {
    variants: {
      variant: {
        success:
          'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-success-400',
        error:
          'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-error-400',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
)

export const sidebarSectionButtonVariants = cva(
  'flex w-full items-center justify-between px-6 py-4 text-left text-primary-700',
  {
    variants: {
      open: {
        true: 'bg-primary-50',
        false: '',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
)

export const sidebarSubmenuItemVariants = cva('py-2', {
  variants: {
    active: {
      true: 'text-primary-600',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
  },
})
