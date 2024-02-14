import React from 'react'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { capitalizeCamelSpace, capitalizeValue } from 'src/utils/helperfunction'
import { MuiTextAreaHookField } from './MuiTextAreaHookField'

const CustomHookTextField = ({ chooseFields, control, errors, item }) => {
  // function textfield
  const textField = (item) => {
    const {
      textarea,
      rows,
      name,
      label,
      required,
      placeholder,
      type,
      value: myValue,
      myvalue
    } = item

    const formatPassportNumber = (value) => {
      if (value.length <= 2) {
        return value.toUpperCase()
      } else {
        if (value.length > 2 && value[2] !== '-') {
          const letters = value.slice(0, 2).toUpperCase()
          const rest = value.slice(2)
          return `${letters}-${rest}`
        }
        return value
      }
    }

    const formatDate = (value) => {
      const numericValue = value.replace(/[^\d]/g, '')
      return numericValue
        .split('')
        .map((char, index) => (index === 2 || index === 4 ? `/${char}` : char))
        .join('')
        .slice(0, 10)
    }
    const handleOnChange = (item, onChange) => (event) => {
      let value = event.target.value

      switch (item.name) {
        case 'passportNumber':
          value = formatPassportNumber(value)
          break
        case 'doi':
        case 'dob':
        case 'doe':
          value = formatDate(value)
          break
        default:
          // No special formatting
          break
      }

      console.log('validate in', value)

      onChange(value)
    }

    return (
      <>
        <Controller
          name={name}
          control={control}
          rules={{
            required: true,
            validate: {
              validDate: (value) =>
                item.name === 'doe' || item.name === 'doi' || item.name === 'dob'
                  ? isValidDate(value) || 'Invalid date'
                  : true
            }
          }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              required={required}
              fullWidth
              type={type ? type : 'text'}
              value={
                myvalue
                  ? myValue === undefined
                    ? ''
                    : myValue
                  : value !== undefined
                  ? capitalizeValue(value)
                  : ''
              }
              sx={{ mb: 4 }}
              label={label ? label : capitalizeCamelSpace(name)}
              onChange={handleOnChange(item, onChange)}
              placeholder={
                placeholder ? placeholder : `Enter ${capitalizeCamelSpace(name)}`
              }
              error={Boolean(errors[name])}
              helperText={errors[name]?.message || ''}
            />
          )}
        />
      </>
    )
  }

  return (
    <>
      {chooseFields
        ? chooseFields.map((item) => {
            return textField(item)
          })
        : textField(item)}
    </>
  )
}

export default CustomHookTextField
