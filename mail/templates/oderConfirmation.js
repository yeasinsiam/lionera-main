
const orderConfirm=(data)=>{
    if(data.lang==="en"){
       return  englishConfirmation(data)
    }

}



const englishConfirmation = (data)=>{
    console.log(data.lang)
    return({
        subject:"Order Confirmation",
        html:`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <title>repl.it</title>
            <style>
                body{
                    background: #ddd;
                    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                }
                .container{
                    max-width: 600px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 30px;
                }
                .lioneraLogo{
                    display: block;
                    margin: 0 auto;
                }
                .text-center{
                    text-align: center;
                }
                .footer{
                    border-top: 1px solid #ddd;
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 12px 30px;
                    background: #de0d51;
                    color: #fff;
                    font-size: 12px;
                   
                }
                .footer h3{
                    margin: 0;
                    padding: 0;
                }
            
        
                .mainTable tr{
                    padding: 10px;
                }
                .mainTable tr img{
                    max-width: 100px;
                }
                .mainTable tr iframe{
                    max-width: 200px;
                    height: 200px;
                }
            </style>
          </head> 
          <body>
              <div class="container">
               <img src="http://localhost:3000/static/media/logo.7d70e41b.svg" class="lioneraLogo">
                <div class="text">
                    <h1 class="text-center">Done!</h1>
                    <p>Dear ${data.shipping.name}</p>
                    <p>Thank you for choosing LIONERA Gifts! Your payment has been confirmed and you’re all set to go. </p>
                </div>
                <p>Please find below your order details:</p>
                <a href="http://18.170.31.157:3000/order/data/${data._id}" >Order summery</a>
         
              </div>
              <div class="footer">
                <h3>Lionera Gift</h3>
                <p>Bangladesh Association of Software and Information Services
                    BDBL Bhaban (Level 5 - West), 12 Kawran Bazar, Dhaka -1215
                </p>
            </div>
            
           
          </body>
        </html>`
    })
} 


module.exports={
    orderConfirm
}