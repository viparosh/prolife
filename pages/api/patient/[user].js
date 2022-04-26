import dbConnect from '../../../utils/dbConnect'
import Patient from '../../../models/Patient'
dbConnect()

export default async (req, res) => {
  const {
    query: { user },
    method,
  } = req
  switch (method) {
    //   Get data according to selected dates
    case 'GET':
      let queryLike = {}
      const is_objectID = /^[a-zA-Z]+$/.test(user)
      console.log(!is_objectID)
      if (!is_objectID && user.length == 24) {
        queryLike = {
          _id: user,
        }
      } else {
        queryLike = {
          $or: [{ fname: user }, { lname: user }],
        }
      }
      try {
        console.log(typeof user)
        Patient.find(queryLike, function (err, result) {
          if (err) {
            return res.status(400).json({ success: false, message: err })
          }
          res.status(200).json({ success: true, data: result })
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const patient = await Patient.findByIdAndUpdate(user, req.body, {
          new: true,
          runValidators: true,
        })
        if (!patient) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: patient })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
