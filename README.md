# Inventory Visibility Backend

This backend service provides inventory visibility and analytics for material-based businesses.
It helps identify low stock and dead stock to improve operational decisions.

## Problem Context
Many material businesses lack real-time inventory visibility, leading to dead stock, stockouts,
and poor working capital utilization.

## Solution
The backend exposes APIs to:
- Create and manage inventory
- Track stock-in and stock-out events
- Generate analytics for low stock and dead stock

## Tech Stack
- Node.js
- Express.js
- In-memory storage
- Deployed on Render

## Analytics Logic
- Low Stock: quantity < threshold
- Dead Stock: quantity == 0

## Sample Data
The system starts with an empty inventory by design.
Sample inventory has been added to the deployed instance to demonstrate analytics.

## Live URL
https://inventory-visibility-backend.onrender.com
