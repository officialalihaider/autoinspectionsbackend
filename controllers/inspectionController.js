const Inspection = require('../models/Inspection');

exports.getAll = async (req, res) => {
  try {
    const { search='', status='', page=1, limit=10 } = req.query;
    const skip = (parseInt(page)-1)*parseInt(limit);
    let q = {};
    if (req.userRole === 'user') q.customerEmail = req.userEmail;
    if (status) q.status = status;
    if (search) q.$or = [
      {vehicleMake:{$regex:search,$options:'i'}},
      {vehicleModel:{$regex:search,$options:'i'}},
      {registrationNo:{$regex:search,$options:'i'}},
      {customerName:{$regex:search,$options:'i'}},
    ];
    const [data, total] = await Promise.all([
      Inspection.find(q).sort({createdAt:-1}).skip(skip).limit(parseInt(limit)),
      Inspection.countDocuments(q),
    ]);
    res.json({success:true,data,total,pages:Math.ceil(total/parseInt(limit)),page:parseInt(page)});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

exports.getOne = async (req, res) => {
  try {
    const d = await Inspection.findById(req.params.id);
    if (!d) return res.status(404).json({success:false,message:'Not found'});
    if (req.userRole==='user' && d.customerEmail!==req.userEmail)
      return res.status(403).json({success:false,message:'Access denied'});
    res.json({success:true,data:d});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

exports.create = async (req, res) => {
  try {
    if (req.userRole!=='admin') return res.status(403).json({success:false,message:'Admin only'});
    const d = await Inspection.create({...req.body,createdBy:req.userId});
    res.status(201).json({success:true,data:d});
  } catch(e){res.status(400).json({success:false,message:e.message});}
};

exports.update = async (req, res) => {
  try {
    if (req.userRole!=='admin') return res.status(403).json({success:false,message:'Admin only'});
    const d = await Inspection.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if (!d) return res.status(404).json({success:false,message:'Not found'});
    res.json({success:true,data:d});
  } catch(e){res.status(400).json({success:false,message:e.message});}
};

exports.remove = async (req, res) => {
  try {
    if (req.userRole!=='admin') return res.status(403).json({success:false,message:'Admin only'});
    await Inspection.findByIdAndDelete(req.params.id);
    res.json({success:true,message:'Deleted'});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

exports.getStats = async (req, res) => {
  try {
    let q = req.userRole==='user'?{customerEmail:req.userEmail}:{};
    const [total,completed,draft,recent] = await Promise.all([
      Inspection.countDocuments(q),
      Inspection.countDocuments({...q,status:'completed'}),
      Inspection.countDocuments({...q,status:'draft'}),
      Inspection.find(q).sort({createdAt:-1}).limit(5).select('vehicleMake vehicleModel registrationNo ratings status inspectionDate customerName'),
    ]);
    const allR = await Inspection.find(q).select('ratings');
    const avgRating = allR.length ? (allR.reduce((s,i)=>s+(i.ratings?.overall||0),0)/allR.length).toFixed(1) : 0;
    let pendingReports = [];
    if (req.userRole==='admin') {
      pendingReports = await Inspection.find({'reportedIssue.hasIssue':true,'reportedIssue.isResolved':false})
        .select('vehicleMake vehicleModel registrationNo reportedIssue customerEmail customerName').limit(20);
    }
    res.json({success:true,data:{total,completed,draft,avgRating,recent,pendingReports}});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

exports.reportIssue = async (req, res) => {
  try {
    const {message} = req.body;
    if (!message?.trim()) return res.status(400).json({success:false,message:'Message required'});
    const d = await Inspection.findById(req.params.id);
    if (!d) return res.status(404).json({success:false,message:'Not found'});
    if (req.userRole==='user' && d.customerEmail!==req.userEmail)
      return res.status(403).json({success:false,message:'Access denied'});
    d.reportedIssue = {hasIssue:true,message,reportedAt:new Date(),isResolved:false,adminReply:''};
    await d.save();
    res.json({success:true,message:'Issue reported'});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

exports.resolveIssue = async (req, res) => {
  try {
    if (req.userRole!=='admin') return res.status(403).json({success:false,message:'Admin only'});
    const d = await Inspection.findByIdAndUpdate(req.params.id,{
      'reportedIssue.adminReply':req.body.adminReply,
      'reportedIssue.isResolved':true,
      'reportedIssue.resolvedAt':new Date(),
    },{new:true});
    res.json({success:true,data:d});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};
