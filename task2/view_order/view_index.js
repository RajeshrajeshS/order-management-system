
const OrderModel = require('./view_sercive')


const getOrdersByDate = async (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  try {
    const orders = await OrderModel.createOrder({
      orderDate: { $gte: startDate, $lte: endDate }
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'failed to get orders' });
    
  }
};

module.exports = {getOrdersByDate};
