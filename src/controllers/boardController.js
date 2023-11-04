import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    // console.log('req.files', req.files)
    // console.log('req.cookies', req.cookies)
    // console.log('req.jwtDecoded', req.jwtDecoded)

    // điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body)
    // có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}
const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    const boardId = req.params.id

    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)
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
  createNew,
  getDetails
}
