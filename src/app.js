import express from  "express"
import cookieParser from "cookie-parser"

const app =  express()
const port = process.env.PORT 

app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import orderRoutes from "./routes/order.route.js"
import cartItemRoutes from "./routes/cartItem.route.js"
import cartRoutes from "./routes/cart.route.js"
import invoiceRoutes from "./routes/invoice.route.js"
import categoryRoutes from "./routes/catogory.route.js"
import sellerRoutes from "./routes/seller.route.js"
import commissionRoutes from "./routes/commission.route.js"
import listingRoutes from "./routes/listing.route.js"
import planRoutes from "./routes/plan.route.js"
import orderItemRoutes from "./routes/orderItem.route.js"
import returnRoutes from "./routes/return.route.js"
import shipmentRoutes from "./routes/shipment.route.js"
import warehouseRoutes from "./routes/warehouse.route.js"
import subscriptionRoutes from "./routes/subscription.route.js"
import paymentRoutes from "./routes/payment.route.js"
import payoutRoutes from "./routes/payout.route.js"


// routes declaration
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/cart-items", cartItemRoutes)
app.use("/api/v1/carts", cartRoutes)
app.use("/api/v1/invoices", invoiceRoutes)  
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/sellers", sellerRoutes)
app.use("/api/v1/commissions", commissionRoutes)
app.use("/api/v1/plans", planRoutes)
app.use("/api/v1/listings", listingRoutes)
app.use("/api/v1/order-items", orderItemRoutes)
app.use("/api/v1/returns", returnRoutes)
app.use("/api/v1/shipments", shipmentRoutes)
app.use("/api/v1/warehouses", warehouseRoutes)
app.use("/api/v1/subscriptions", subscriptionRoutes)
app.use("/api/v1/payments", paymentRoutes)
app.use("/api/v1/payouts", payoutRoutes)

export default app

export {app, port}