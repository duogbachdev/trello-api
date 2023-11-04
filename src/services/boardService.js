/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    //
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)

    //Lấy bản ghi board sau khi gọi (tùy mục đích dự án)
    const getNewBoard = await boardModel.findOneByID(createdBoard.insertedId)
    console.log(getNewBoard)

    // Trả kết quả về trong Service luôn phải có return
    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    // Trả kết quả về trong Service luôn phải có return
    return board
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}