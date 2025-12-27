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

// Stock IN
app.post("/stock/in", (req, res) => {
  const item = inventory.find(i => i.id === req.body.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.quantity += req.body.quantity;
  item.lastMovedAt = new Date();
  res.json(item);
});

// Stock OUT
app.post("/stock/out", (req, res) => {
  const item = inventory.find(i => i.id === req.body.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.quantity -= req.body.quantity;
  item.lastMovedAt = new Date();
  res.json(item);
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
