'use client'

import * as React from 'react'
import { MinusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

// Lightweight fallback implementation for OTP UI used when the optional
// `input-otp` package isn't available. This provides simple slots so other
// parts of the app can still render without build-time dependency errors.

function InputOTP({
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<'div'> & { containerClassName?: string }) {
  return (
    <div
      data-slot="input-otp"
      className={cn('flex items-center gap-2 has-disabled:opacity-50', containerClassName)}
      {...props}
    >
      {children}
    </div>
  )
}

function InputOTPGroup({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props}>
      {children}
    </div>
  )
}

function InputOTPSlot({ index, className, children, ...props }: React.ComponentProps<'div'> & { index?: number }) {
  return (
    <div
      data-slot="input-otp-slot"
      className={cn('border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm first:rounded-l-md last:rounded-r-md', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
