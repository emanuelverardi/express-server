const mongoose = require('mongoose');

exports.getPersonalDetails = (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    const personalDetailsSchema = new mongoose.Schema({
        message: String,
        more: String
    }, { collection: 'personal_details' });

    const PersonalDetails = mongoose.model('PersonalDetails', personalDetailsSchema);

    PersonalDetails.find({}, (err, personalDetails) => {
        if (err) res.status(500).send(err);
        res.status(200).json(personalDetails);
    }).sort({ '_id': 1 });
}