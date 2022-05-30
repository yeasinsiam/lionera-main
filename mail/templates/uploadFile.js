
const uploadFile=(data)=>{
    if(data.lang==="en"){
       return  enUploadFile(data)
    }

}



const enUploadFile = (data)=>{
    console.log(data.lang)
    return({
        subject:"File Uploaded",
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
                    <h1 class="text-center">Order Information Uploaded</h1>
                    <p>Dear ${data.shipping.name}</p>
                    <p>Thank you for providing the information of your Order #${data._id}  You are all set to go for now and we will be working on finalizing your order. 
                    </p>
                    <p>Please remember that you can still make changes to the information submitted within the next 24 hours in which after that time no further modifications could be made.</p>
                    <p>To see Order Information Form details <a href="http://18.170.31.157:3000/form/data/${data._id}">Click Here</a></p>

                </div>
                <p>To edit this information (within 24 hours) <a href="http://18.170.31.157:3000/order/${data._id}">Update Now</a></p>
                <p>Thank you again for your order and hold tight until you receive your Greeting Card!</p>
                <p>
                Regards,<br>
LIONERA Gifts Team 
                </p>
         
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
    uploadFile
}