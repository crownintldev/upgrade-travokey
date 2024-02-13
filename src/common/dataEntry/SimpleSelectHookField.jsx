// import React, { useState } from 'react'
// import { Controller } from 'react-hook-form'
// import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
// import CustomTextField from 'src/@core/components/mui/text-field'

// const SimpleSelectHookField = ({
//   control,
//   errors,
//   name,
//   options,
//   label,
//   placeholder,
//   disableClearable
// }) => {
//   // const [inputValue, setInputValue] = useState('')

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
//         <CustomAutocomplete
//           {...field}
//           sx={{ mb: 4 }}
//           options={options ? options : ['confirmed', 'processing']}
//           id='autocomplete-size-medium'
//           value={value || null}
//           // onInputChange={(event, newInputValue) => {
//           //   setInputValue(newInputValue)
//           // }}
//           getOptionLabel={(option) => option || ''}
//           isOptionEqualToValue={(option, value) => option === value}
//           onChange={(event, newValue) => {
//             onChange(newValue)
//           }}
//           disableClearable={disableClearable || false}
//           renderInput={(params) => (
//             <CustomTextField
//               {...params}
//               size='small'
//               label={label}
//               placeholder={placeholder}
//               error={Boolean(errors && errors[name])}
//               helperText={errors ? errors[name]?.message : null}
//             />
//           )}
//         />
//       )}
//     />
//   )
// }

// export default SimpleSelectHookField

import React from 'react'
import { Controller } from 'react-hook-form'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandItem, CommandInput } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SimpleSelectHookField = ({
  control,
  name,
  options,
  label,
  placeholder,
  disableClearable
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Popover className='z-50'>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-[200px] justify-between'>
              {value || placeholder}
              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[600px] z-50'>
            <Command>
              <CommandInput placeholder='Search...' className='h-9' />
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => onChange(option)}
                >
                  {option}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}

export default SimpleSelectHookField
