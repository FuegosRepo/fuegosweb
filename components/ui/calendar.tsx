'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-white group/calendar p-3 sm:p-4 md:p-6 [--cell-size:2.25rem] sm:[--cell-size:2.75rem] md:[--cell-size:3.5rem] rounded-lg w-full max-w-[350px] min-h-[320px] sm:min-h-[360px] md:min-h-[400px]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-full', defaultClassNames.root),
        months: cn(
          'flex gap-3 sm:gap-4 md:gap-6 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-3 sm:gap-4 md:gap-6', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-2 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none hover:bg-orange-100 rounded-lg transition-colors',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none hover:bg-orange-100 rounded-lg transition-colors',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-lg font-bold justify-center h-(--cell-size) gap-2 text-gray-900',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-orange-500 border border-input shadow-xs has-focus:ring-orange-500/30 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-white inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-bold text-gray-900',
          captionLayout === 'label'
            ? 'text-lg'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-lg h-10 [&>svg]:text-muted-foreground [&>svg]:size-5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse mt-2',
        weekdays: cn('flex mb-2', defaultClassNames.weekdays),
        weekday: cn(
          'text-gray-600 rounded-md flex-1 font-bold text-[0.75rem] sm:text-[0.875rem] select-none uppercase tracking-wider h-10 flex items-center justify-center',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-1 sm:mt-1.5', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.75rem] sm:text-[0.8rem] select-none text-muted-foreground font-medium',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0.5 text-center [&:first-child[data-selected=true]_button]:rounded-lg [&:last-child[data-selected=true]_button]:rounded-lg group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-lg bg-orange-100',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none bg-orange-50', defaultClassNames.range_middle),
        range_end: cn('rounded-r-lg bg-orange-100', defaultClassNames.range_end),
        today: cn(
          'bg-orange-50 text-orange-900 font-bold rounded-lg data-[selected=true]:bg-orange-500 data-[selected=true]:text-white',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-gray-400 aria-selected:text-gray-400',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-gray-300 opacity-50 cursor-not-allowed',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-6 text-gray-700', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-6 text-gray-700', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-6 text-gray-700', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-orange-500 data-[selected-single=true]:text-white data-[selected-single=true]:font-bold data-[selected-single=true]:hover:bg-orange-600 data-[selected-single=true]:shadow-md',
        'data-[range-middle=true]:bg-orange-100 data-[range-middle=true]:text-orange-900',
        'data-[range-start=true]:bg-orange-500 data-[range-start=true]:text-white data-[range-start=true]:font-bold',
        'data-[range-end=true]:bg-orange-500 data-[range-end=true]:text-white data-[range-end=true]:font-bold',
        'group-data-[focused=true]/day:border-orange-500 group-data-[focused=true]/day:ring-orange-500/30',
        'hover:bg-orange-50 hover:text-orange-900 hover:scale-105 transition-all duration-200',
        'flex aspect-square size-auto w-full h-full min-w-(--cell-size) min-h-(--cell-size) flex-col gap-1 leading-none font-semibold',
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]',
        'data-[range-end=true]:rounded-lg data-[range-end=true]:rounded-r-lg',
        'data-[range-middle=true]:rounded-none',
        'data-[range-start=true]:rounded-lg data-[range-start=true]:rounded-l-lg',
        'rounded-lg text-[0.875rem] sm:text-base',
        '[&>span]:text-[0.875rem] sm:[&>span]:text-base',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
