// imports
import express from "express";
import { PrismaClient } from "@prisma/client";

// variables
const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

// middlewares
app.use(express.json());
app.use("/", express.static("./public"));
app.use("/client", async (req, res) => {
  const { name, email, phone } = req.body;
  const phoneInt = parseInt(phone);
  const client = await prisma.client.findUnique({
    where: { email: email },
  });
  if (client) {
    res.status(202).send("פרטיך כבר קיימים במערכת");
  } else {
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        phone: phoneInt,
      },
    });
    res.status(201).json({ msg: newClient });
  }
});
app.all("*", (req, res) => {
  res.status(404).send("not found");
});

// run
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
