const User = require('../models/user');
const Company = require('../models/company');

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