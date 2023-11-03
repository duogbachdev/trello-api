import express from 'express'
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    // custom messages
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title min 3 characters',
      'string.max': 'Title min 50 characters',
      'string.trim': 'Title must not have leading or trailing whitespaces'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // abortEarly: false : hiển thị ra hết full lỗi nếu có nhiều lỗi validation
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang Controller
    next()
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }

}

export const boardValidation = {
  createNew
}