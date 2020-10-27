const {Order,  CartItem} = require('../models/order')
const nodemailer = require('nodemailer');
const { errorHandler } = require('../helpers/dbErrorHandler');






//email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ravivithuzan03@gmail.com',
    pass: 'Vithu@zan17' // naturally, replace both with your real credentials or an application-specific password
  }
});
//email


exports.create = (req,res) => {
  // console.log("CREATE ORDER:" , req.body);
  req.body.order.user = req.profile
  const order = new Order (req.body.order)
  order.save((error,data) => {
    if (error) {
      return res.status (400).json ({
        error:errorHandler(error)
      })
    }
    //email
    const mailOptions = {
      from: 'ravivithuzan03@gmail.com',
      to: 'ravivithuzan03@gmail.com',
      subject: 'Pubg Tournement',
      html:`<h1>${order.user.firstname} Has Been Paid</h1>
      <p>Rs.${order.amount}</p>
      <p>His Pubg Name Is ${order.user.pubgname}</p>
      <p>His Email Id Is  ${order.user.email}</p>
      <p>Transaction Id ${order.transaction_id}</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json(data);
  })
};


exports.listOrders = (req, res) => {
  Order.find()
      .populate('user', '_id name address')
      .sort('-created')
      .exec((err, orders) => {
          if (err) {
              return res.status(400).json({
                  error: errorHandler(error)
              });
          }
          res.json(orders);
      });
};