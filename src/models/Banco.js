const mongoose = require('mongoose')

const BancoSchema = new mongoose.Schema(
    {
        _id: {type: Number, default:1, required: true},
        name:{type: String, required: true},
        anual_interest_rate:{type: String, required: true},
        max_parcela:{type: Boolean, required: false}
    }
)

BancoSchema.pre('save', async function(next) {
    if (!this.isNew) {
      return next();
    }
    const lastEntity = await Banco.findOne({}, {}, { sort: { '_id' : -1 } });
    if (lastEntity && lastEntity._id) {
      this._id = lastEntity._id + 1;
    }
    next();
});

const Banco = mongoose.model('Banco', BancoSchema)

module.exports = Banco