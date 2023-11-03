import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)

    // điều hướng dữ liệu sang tầng Service

    // throw new ApiError(StatusCodes.BAD_REQUEST, 'duogbachdev')
    // có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: APIs create new board' })
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const boardController = {
  createNew
}
