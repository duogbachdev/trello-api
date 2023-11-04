import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    //
    const newColumn = {
      ...reqBody
    }

    // Gọi tới tầng model để xử lý lưu bản ghi newColumn vào trong Database
    const createdColumn = await columnModel.createNew(newColumn)

    //Lấy bản ghi column sau khi gọi (tùy mục đích dự án)
    const getNewColumn = await columnModel.findOneByID(createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lý cấu trúc data ở đây trước khi trả dữ liệu
      getNewColumn.cards = []

      // Cập nhật lại mảng ColumnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    // Trả kết quả về trong Service luôn phải có return
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}