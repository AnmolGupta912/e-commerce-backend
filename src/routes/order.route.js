import { Router } from 'express'
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} from '../controllers/order.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewear.js'

const router = Router()
router.use(verifyJWT)    

router.route('/create-order/:cartId').post(createOrder)
router.route('/get-my-orders').get(getMyOrders)
router.route('/get-order/:orderId').get(getOrderById)
router.route('/update-order-status/:orderId').put(updateOrderStatus)
router.route('/cancel-order/:orderId').delete(cancelOrder)

export default router

// not tested yet, but should work fine