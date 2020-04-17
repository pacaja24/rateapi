const User = require('../models/user');
const Company = require('../models/company');
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'rateapi', 
    api_key: '745524826696263', 
    api_secret: 'e9SJ2ER02VKY-531bnpooijB1rU'
});


exports.addImage = async (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
        const savedData = async () => {
            if(req.body.image){
                await User.update({
                    '_id': req.body.user._id
                }, {
                    "imageId": result.public_id,
                    "imageVersion": result.version
                });
            }
        }

        savedData()
            .then(result => {
                return res.status(200).json({message: 'Profile image uploaded'});
            })
    });
}

exports.addLogo = async (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
        const savedData = async () => {
            if(req.body.image){
                await Company.update({
                    '_id': req.body.company
                }, {
                    "imageId": result.public_id,
                    "imageVersion": result.version
                });
            }
        }

        savedData()
            .then(result => {
                return res.status(200).json({message: 'Company logo uploaded'});
            })
    });
}