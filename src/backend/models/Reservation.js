import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Class is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['confirmed', 'cancelled'],
      message: 'Status must be confirmed or cancelled',
    },
    default: 'confirmed',
  },
}, {
  timestamps: true,
});

reservationSchema.index({ user: 1, class: 1, date: 1 }, { unique: true });

reservationSchema.pre('save', async function (next) {
  const Class = mongoose.model('Class');

  if (this.isNew) {
    await Class.findByIdAndUpdate(this.class, { $inc: { enrolledCount: 1 } });
  } else if (this.isModified('status')) {
    if (this.status === 'cancelled') {
      await Class.findOneAndUpdate(
        { _id: this.class, enrolledCount: { $gt: 0 } },
        { $inc: { enrolledCount: -1 } }
      );
    } else if (this.status === 'confirmed') {
      await Class.findByIdAndUpdate(this.class, { $inc: { enrolledCount: 1 } });
    }
  }

  next();
});

export default mongoose.model('Reservation', reservationSchema);
