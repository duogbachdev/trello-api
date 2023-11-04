import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    //
    const newCard = {
      ...reqBody
    }

    // Gọi tới tầng model để xử lý lưu bản ghi newCard vào trong Database
    const createdCard = await cardModel.createNew(newCard)

    //Lấy bản ghi card sau khi gọi (tùy mục đích dự án)
    const getNewCard = await cardModel.findOneByID(createdCard.insertedId)

    if (getNewCard) {
      // Cập nhật lại mảng ColumnOrderIds trong collection boards
      await columnModel.pushCardOrderIds(getNewCard)
    }
    // Trả kết quả về trong Service luôn phải có return
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}