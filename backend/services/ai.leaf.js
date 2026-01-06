
exports.detectDisease=async(imagePath)=>{

    await new Promise((resolve)=>setTimeout(resolve,2000))
    return{
        disease:"Leaf Blight",
        cause:"Fungal Infection"
    }
}
