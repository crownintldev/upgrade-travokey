// // ** React Import
// import { forwardRef } from 'react'

// // ** MUI Import
// import Paper from '@mui/material/Paper'
// import Autocomplete from '@mui/material/Autocomplete'

// const CustomAutocomplete = forwardRef((props, ref) => {
//   return (
//     // eslint-disable-next-line lines-around-comment
//     // @ts-expect-error - AutocompleteProps is not compatible with PaperProps
//     <Autocomplete
//       {...props}
//       ref={ref}
//       PaperComponent={(props) => (
//         <Paper {...props} className='custom-autocomplete-paper' />
//       )}
//     />
//   )
// })

// export default CustomAutocomplete

import React, { useState } from 'react'
import classnames from 'classnames' // Import the classnames library
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]

const CustomAutocomplete = ({ options }) => {
  console.log('props output', options)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Select framework...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[700px] p-10 z-50 bg-black'>
        <Command>
          <CommandInput placeholder='Search framework...' className='h-9' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                {framework.label}
                <CheckIcon
                  className={classnames(
                    // Use classnames function
                    'ml-auto h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CustomAutocomplete
