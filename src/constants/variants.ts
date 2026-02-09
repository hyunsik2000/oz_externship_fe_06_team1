import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md font-bold transition-colors remove-focus-outline',
  {
    variants: {
      variant: {
        default: 'bg-grey-100 text-grey-600',
        primary: 'bg-primary-300 text-primary-600',
        success: 'bg-success-100 text-success-400',
        danger: 'bg-error-100 text-error-400',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0.5 h-5',
        md: 'text-sm px-2.5 py-1 h-7',
        status: 'h-[24px] w-[69px] text-xs rounded-[3px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-sm font-semibold transition-all remove-focus-outline disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-700 text-white hover:opacity-90',
        secondary: 'bg-grey-400 text-white hover:opacity-90',
        search: 'bg-grey-600 text-white hover:opacity-90',
        outline:
          'border border-grey-300 bg-white text-grey-600 hover:bg-grey-50',
        confirm: 'bg-primary-600 text-white hover:opacity-90',
        success: 'bg-success-400 text-white hover:opacity-90',
        warning: 'bg-warning-400 text-white hover:opacity-90',
        danger: 'bg-error-400 text-white hover:opacity-80',
        ghost: 'bg-transparent text-grey-600 hover:bg-grey-100',
        filter:
          'bg-primary-50 text-primary-700 hover:bg-primary-300 border-none shadow-none pr-1.5',
      },
      size: {
        default: 'h-10 px-4 py-2.5',
        sm: 'h-9 px-4 text-xs',
        search: 'h-9 w-[70px] px-0 text-sm',
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

export const dropdownTriggerVariants = cva(
  'flex w-full items-center justify-between transition-all outline-none',
  {
    variants: {
      variant: {
        outline: 'border border-grey-300 bg-white text-sm hover:bg-grey-50',
        memberFilter:
          'border border-[#DDDDDD] bg-white text-sm hover:bg-grey-50',
        ghost:
          'w-auto border-none bg-transparent p-0 gap-1 text-xl font-bold text-grey-800 hover:bg-transparent',
      },
      size: {
        sm: 'h-9 rounded-[3px] px-3',
        md: 'h-10 rounded-md px-3',
      },
      disabled: {
        true: 'bg-grey-50 text-grey-400 cursor-not-allowed',
        false: 'text-grey-800 cursor-pointer',
      },
      open: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        className: 'px-0',
      },
      {
        variant: 'outline',
        open: true,
        className: 'border-primary-500 ring-1 ring-primary-500',
      },
      {
        variant: 'memberFilter',
        open: true,
        className: 'border-primary-500 ring-1 ring-primary-500',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      disabled: false,
      open: false,
    },
  }
)

export const dropdownMenuVariants = cva(
  'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg outline-none animate-in fade-in-0 zoom-in-95 duration-100',
  {
    variants: {
      border: {
        default: 'border-grey-100',
      },
    },
    defaultVariants: {
      border: 'default',
    },
  }
)

export const dropdownItemVariants = cva(
  'flex cursor-pointer select-none items-center justify-between px-3 py-2.5 text-sm transition-colors',
  {
    variants: {
      selected: {
        true: 'bg-primary-50 text-primary-600 font-medium',
        false: 'text-grey-700 hover:bg-grey-50',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export const inputVariants = cva(
  'flex w-full rounded-[3px] border bg-white px-3 py-2 text-sm transition-all outline-none placeholder:text-grey-400 disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-400',
  {
    variants: {
      status: {
        default: 'border-grey-300 focus:border-primary-500',
        error: 'border-error-400 focus:border-error-400',
      },
      size: {
        sm: 'h-9',
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
        sm: 'max-w-[426px] rounded-sm',
        md: 'max-w-[600px] rounded-xl',
        ml: 'max-w-[790px] min-w-[650px] rounded-md ',
        lg: 'max-w-[900px] rounded-xl',
        full: 'max-w-[95vw] h-[90vh] rounded-xl',

        filter: 'w-[509px] rounded-md',
        memberDetail:
          'w-[850px] h-[871px] max-w-none rounded-[6px] border border-grey-200',
        attemptDetail:
          'w-[790px] h-[911px] rounded-[6px] border border-grey-200',
        solution: 'w-[1540px] h-[780px] rounded-[12px] border border-grey-200',
        alert: 'w-[426px] min-h-[267px] rounded-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export const toastVariants = cva(
  'relative flex items-center w-full max-w-[350px] h-[42px] px-4 py-2 bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all animate-in slide-in-from-right-5',
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

export type SkeletonVariant = 'text' | 'rect' | 'circle'
export type SkeletonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export const skeletonVariants = cva('skeleton', {
  variants: {
    variant: {
      text: '',
      rect: '',
      circle: '',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    tone: {
      default: '',
      subtle: 'opacity-70',
    },
  },
  defaultVariants: {
    variant: 'rect',
    radius: 'md',
    tone: 'default',
  },
})
