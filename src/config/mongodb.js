import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới mongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý : cái serveAPI có từ phiên bản 5.0.0 trở lên, có thể không cần dùng nó, còn nếu dùng nó chúng ta chỉ định một cái Stable API Version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới database
export const CONNECT_DB = async () => {
// Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first !')
  return trelloDatabaseInstance
}

// Đóng kết nối khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}