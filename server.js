import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let inventory = [];
const DEAD_STOCK_DAYS = 60;

const daysBetween = (date) =>
  Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));

app.get("/", (req, res) => {
    res.json({
      service: "Inventory Visibility Backend",
      status: "running",
      description: "API-only backend for inventory visibility and analytics",
      availableEndpoints: [
        "/inventory",
        "/analytics/low-stock",
        "/analytics/dead-stock",
        "/health"
      ],
      note: "Use the above endpoints to validate backend functionality"
    });
  });
  
  // Health check route
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
  });

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
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.quantity += req.body.quantity;
  item.lastMovedAt = new Date();
  res.json(item);
});

// Stock OUT
app.post("/stock/out", (req, res) => {
  const item = inventory.find(i => i.id === req.body.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.quantity -= req.body.quantity;
  item.lastMovedAt = new Date();
  res.json(item);
});

// Dead stock analytics
app.get("/analytics/dead-stock", (req, res) => {
  const deadStock = inventory.filter(
    item => daysBetween(item.lastMovedAt) > DEAD_STOCK_DAYS
  );
  res.json(deadStock);
});

// Low stock analytics
app.get("/analytics/low-stock", (req, res) => {
  const lowStock = inventory.filter(
    item => item.quantity < item.minThreshold
  );
  res.json(lowStock);
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
