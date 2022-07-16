const paypal = require('@paypal/checkout-server-sdk');
const OrderModel = require("../models/orderModel");
const sendEmail = require('../mail/sendEmail');


let clientId = "ASe__0SAI_dEB6qnwS_DHWcHyfaXb9l4Z-ZjJs0KO4MgRPwGEQZQEm7N1n6sOEhfG1hTFOfs94zmCAhz";
let clientSecret = "EJk_Y1aIDlJOWTj4AczeHax425YMQYxMZGT22ZZiL74EcHV35g7q1QON5OCsZ3lGW_2K6GYW-yn2umN5";
// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);




const createOrder = async (req, res, next) => {
    try {
        const { orderId } = req.body;
        let unselectedLang = "en"
        const order = await OrderModel.findById(orderId)
            .populate('package')
            .populate('addons')


        let totalPrice = order.prices.AED.totalPrice;
        // order.addons.map(item => {
        //     totalPrice = totalPrice + item.price;
        // })



        let request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            "intent": "CAPTURE",
            "application_context": {
                "return_url": `${process.env.CLIENT_URL}/success`,
                "cancel_url": `${process.env.CLIENT_URL}/cancel`,
                "brand_name": "Lionera",
                "locale": "en-US",
                "landing_page": "BILLING",
                "user_action": "CONTINUE"
            },
            "purchase_units": [
                {
                    "reference_id": orderId,
                    "amount": {
                        "currency_code": "USD",
                        "value": totalPrice
                    }
                }
            ]
        });

        const response = await client.execute(request);
        res.send({
            status: true,
            href: response.result.links[1].href
        })

    } catch (err) {
        res.send({
            status: false
        })
    }
}

const successOrder = async (req, res, next) => {

    try {
        const token = req.query.token;
        let request = new paypal.orders.OrdersCaptureRequest(token);
        let response = await client.execute(request);

        const order = await OrderModel.findByIdAndUpdate(response.result.purchase_units[0].reference_id, { financial_status: "paid" }).populate("design").populate("occasion")
            .populate("package").populate("addons").populate("slideshow");

        // const order = await OrderModel.findByIdAndUpdate("60ed5885d14f5005281c6730",{financial_status:"paid"}).populate("design").populate("occasion")
        // .populate("package").populate("addons").populate("slideshow");

        sendEmail(order.shipping.email, "order_confirm", order);



        // res.redirect(`http://localhost:3000/success/${response.result.purchase_units[0].reference_id}`)

        res.send({
            status: true,
            order: order
        })

    } catch (err) {
        console.log(err)

        res.status(500).send({
            status: false,
            message: err
        })
        console.log(err)
    }



}

module.exports = {
    successOrder,
    createOrder
}