app.post("/lock/:id", (req, res) => {
  const seatId = req.params.id;

  if (!seats[seatId]) {
    return res.status(404).json({ message: "Seat not found." });
  }

  if (seats[seatId].status === "booked") {
    return res.status(400).json({ message: `Seat ${seatId} is already booked.` });
  }

  if (seats[seatId].status === "locked") {
    return res.status(400).json({ message: `Seat ${seatId} is already locked.` });
  }

  seats[seatId].status = "locked";

  lockTimers[seatId] = setTimeout(() => {
    if (seats[seatId].status === "locked") {
      seats[seatId].status = "available";
    }
  }, 60000);

  res.json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
});
