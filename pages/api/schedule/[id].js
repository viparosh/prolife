import dbConnect from '../../../utils/dbConnect'
import Schedule from '../../../models/Schedule'
dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req
  switch (method) {
    case 'GET':
      try {
        const schedule = await Schedule.findById(id)
        if (!schedule) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: schedule })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!schedule) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: schedule })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const deletedSchedule = await Schedule.deleteOne({ _id: id })

        if (!deletedSchedule) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
