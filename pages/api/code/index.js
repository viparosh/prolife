export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const URI = "https://api.semaphore.co/api/v4/priority"
        await fetch(URI, {
          method: "POST",
          body: JSON.stringify({
            message: `Blessed Hope Maternity Lying-in Clinic\n\n Your verification code is ${req.body.verification_code}`,
            number: `63${req.body.mobile_number}`,
            apikey: process.env.SMS_API
          }),
          headers: { "Content-Type": "application/json" },
        })

          .then((response) => {
            return res.status(200).json({ success: true, data: response });
          })
          .catch((e) => {
            return res.status(500).json({ success: false, error: e.message});
          });

      } catch (e) {
        res.status(500).json({ success: false, error: e.message});
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};