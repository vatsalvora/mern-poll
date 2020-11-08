const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const pollResultSchema = new Schema({
   pollId: String,
   response: String,
   timestamp: 
});

pollSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
pollResultSchema.set('toJSON', {
    virtuals: true
});

const PollResult = mongoose.model('PollResults', pollResultSchema);

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Poll.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, polls) {
                if (err) {
                    reject(err);
                } else {
                    resolve(polls);
                }
            })
    });
};

exports.findById = (id) => {
    return Poll.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

pollResultSchema.findById = function (cb) {
    return this.model('PollResults').find({id: this.id}, cb);
};


exports.createPoll = (pollData) => {
    const poll = new Poll(pollData);
    return poll.save();
};