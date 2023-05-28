export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
  
        const URI = "https://api.semaphore.co/api/v4/messages";
        await fetch(URI, {
          method: "POST",
          body: JSON.stringify({
            message:
            ((req.body.part == 1) ?
            `1/2 Greetings, ${req.body.patientName} !
            \nYour schedule at BHLMC is ${req.body.date} , ${req.body.timeslot}.`
            : `2/2 To cancel the appointment, visit https://prolifecommunity.vercel.app/cancellation , Code: ${req.body.cancellationCode}\n\n`
          ),      
            number: `63${req.body?.contact}`,
            apikey: process.env.SMS_API,
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
