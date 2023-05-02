
const express = require('express');
const mongoose = require('mongoose');

const viewSchema = mongoose.Schema({
  orderID: {type:String, required:true},
  customer: {type:String, required:true},
  orderItems: {type:String, required:true},
  shippingAddress: {type:String, required:true},
  orderDate: {type:Date, required:true},
  totalAmount: {type:Number, required:true}
});

const Order = mongoose.model('Order', viewSchema);

const createOrder = async (req, res) => {
  try {
    const order = new Order({
      orderID: req.body.orderID,
      customer: req.body.customer,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      orderDate: new Date(req.body.orderDate),
      totalAmount: req.body.totalAmount,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrdersByDate = async (req, res) => {
  try {
    const orders = await Order.find({ orderDate: new Date(req.query.date) });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getOrdersByDate
};
