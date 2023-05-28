import moment from "moment"

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const URI = "https://api.semaphore.co/api/v4/priority";
        await fetch(URI, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            message: `Greetings, ${req.body.patientName} !\n
            We suggest you to create an appointment before ${moment(req.body.date).format("MMMM D, YYYY")} by midwife/ob-gyne.`,
            number: `63${req.body?.contact}`,
            apikey: process.env.SMS_API,
            sendername: "SEMAPHORE",
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            return res.status(200).json({ success: true, data: response });
          })
          .catch((e) => {
            return res.status(500).json({ success: false, error: e });
          });
      } catch (e) {
        res.status(500).json({ success: false, error: e });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};