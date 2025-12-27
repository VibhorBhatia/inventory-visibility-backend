import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let inventory = [];

// Create inventory item
app.post("/inventory", (req, res) => {
  const product = {
    id: Date.now(),
    name: req.body.name,
    quantity: req.body.quantity,
    minThreshold: req.body.minThreshold,
    costPrice: req.body.costPrice,
    lastMovedAt: new Date()
  };
  inventory.push(product);
  res.json(product);
});

// Get inventory
app.get("/inventory", (req, res) => {
  res.json(inventory);
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
