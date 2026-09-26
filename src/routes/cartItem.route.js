import  { createCartItem, deleteCartItem, updateCartItemQuantity, getCartItemsByCartId } from '../controllers/cartItem.controller.js'

import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middlewear.js'

const router = Router()

router.use(verifyJWT)

router.route('/create-cart-item/:cartId/:productId').post(createCartItem)
router.route('/delete-cart-item/:cartItemId').delete(deleteCartItem)
router.route('/update-cart-item-quantity/:cartItemId').put(updateCartItemQuantity)
router.route('/get-cart-items-by-cart-id/:cartId').get(getCartItemsByCartId)

export default router

