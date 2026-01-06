const Leaf=require("../model/Leaf")
const aiLeafService=require("../services/ai.leaf")
const casheService=require("../services/CasheRedis")
//create leaf controller

exports.createLeaf=async(req,res)=>{
    try{
            const casheKey=`Leaf:${req.file.path}`

            const casheKeyData=await casheService.getcashe(casheKey);

            if(casheKeyData){
                return res.status(200).json({
                    message:"Leaf analyzed  sucessfully",
                    data:casheKeyData
                })
            }

        const aiResult=await aiLeafService.detectDisease(req.file.path)
        const leaf= await Leaf.create({
            image:req.file.path,
            disease:aiResult.disease,
            cause:aiResult.cause
            //farmer:req.user.id
        })

        await casheService.setcashe(casheKey,leaf)
        res.status(201).json({
            message:"Leaf analyzed  sucessfully",
            data:leaf

        })
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}