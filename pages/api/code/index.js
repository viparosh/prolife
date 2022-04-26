export default async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
      const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
      const client = require('twilio')(accountSid, authToken)
      client.messages
        .create({
          body: `Your Verification code is ${req.body.verification_code}`,
          from: '+18312925496',
          to: `+63${req.body.mobile_number}`,
        })
        .then((message) => console.log(message))
        .catch((err) => console.log(err))
      res.status(200).json({ success: true })
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
