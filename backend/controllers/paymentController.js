const { json } = require("express");
const Transaction=require("../models/Transaction");
const Wallet=require("../models/Wallet");

exports.pay=async(req,res)=>{
    try{
        const {amount,idemotencykey}=req.body;

        const recentTransactions=await Transaction.find({
            userId:req.userId,
            createdAt:{$gte:new Date(Date.now()-60*100)}
        });
        if(recentTransactions.length>5){
            return res.status(529).json({
                message:"Too many requests.Possible fraud detected."
            });
        }

        const existingTx=await Transaction.findOne({idempotencyKey});
        if(existingTx){
            return res.json(existingTx);
        }

        const transaction=await Transaction.create({
            userId:req.userId,
            amount,
            status:"PENDING",
            idempotencyKey
        });

        const wallet=await Wallet.findOne({userId:req.userId});

        if(!wallet||wallet.balance<amount){
            transaction.status="FAILED";
            await transaction.save();
            return res.status(400).json({message:"Insufficient balance"});
        }

        const succes=Math.random()>0.2;

        if(succes){
            wallet.balance-=amount;
            await wallet.save()
            transaction.status="SUCCESS";
        }else{
            transaction.status="FAILED";
        }

        await transaction.save()
        res.json(transaction);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.refund=async(req,res)=>{
    try{
        const {transactionId}=req.body;
        const transaction=await Transaction.findById(transactionId);
        if(!transaction){
            return res.status(404).json({message:"Transaction not found"});
        }
        if(transaction.status!=="SUCCESS"){
            return res.status(400).json({message:"Only successfull transaction can be refunded"});
        }
        if(transaction.status=="REFUNDED"){
            return res.status(400).json({message:"Already refunded"});
        }

        const wallet=await Walllet.findOne({userId:transaction.userId});
        wallet.balance+=transaction.amount;
        await wallet.save();
        transaction.status="REFUNDED";
        await transaction.save();
        res.json({message:"Refund Successful",transaction});
    }catch(err){
        res.status(500).json({error:err.message});   
    }
};

exports.retryPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction || transaction.status !== "FAILED") {
      return res.status(400).json({ message: "Invalid retry request" });
    }

    const wallet = await Wallet.findOne({ userId: transaction.userId });

    if (wallet.balance < transaction.amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const success = Math.random() > 0.3;

    if (success) {
      wallet.balance -= transaction.amount;
      await wallet.save();

      transaction.status = "SUCCESS";
    } else {
      transaction.status = "FAILED";
    }

    await transaction.save();

    res.json(transaction);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};