import React, { useEffect, useState } from 'react'
//get by data
import axios from 'axios'
import { Button } from '@/components/ui/button'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createApi, updateApi } from 'src/action/function'
import CustomHookTextField from 'src/common/dataEntry/CustomHookTextField'

const CommonForm1 = ({
  toggle,
  fetchApi,
  api,
  _id,
  stateSelector,
  removeSelection,
  schema,
  defaultValues,
  chooseFields
}) => {
  const dispatch = useDispatch()
  let editId = useSelector((state) =>
    state[stateSelector]?.data?.find((item) => item._id === _id)
  )

  const {
    reset,
    control,
    setError,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    if (editId) {
      Object.keys(editId).forEach((key) => {
        setValue(key, editId[key])
      })
    } else {
      reset()
    }
  }, [setValue, editId])

  // close on close button
  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async (data) => {
    if (editId) {
      updateApi({
        _id,
        api,
        data,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      })
    } else {
      createApi({
        api,
        data,
        dispatch,
        fetchData: fetchApi,
        toggle,
        reset,
        removeSelection
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {chooseFields.map((item, index) => {
          return <CustomHookTextField item={item} control={control} errors={errors} />
        })}

        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' variant='contained' sx={{ mr: 3 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CommonForm1
