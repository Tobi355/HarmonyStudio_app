import Class from '../models/Class.js';
import Reservation from '../models/Reservation.js';
import AppError from '../utils/error.js';

const getAll = async (filters = {}) => {
  const query = {};
  if (filters.isActive !== undefined) query.isActive = filters.isActive;
  return Class.find(query).sort({ createdAt: -1 });
};

const getById = async (id) => {
  const cls = await Class.findById(id);
  if (!cls) throw new AppError('Class not found.', 404);
  return cls;
};

const create = async (data) => {
  return Class.create(data);
};

const update = async (id, data) => {
  const cls = await Class.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!cls) throw new AppError('Class not found.', 404);
  return cls;
};

const remove = async (id) => {
  const cls = await Class.findByIdAndDelete(id);
  if (!cls) throw new AppError('Class not found.', 404);

  const reservations = await Reservation.find({
    class: id,
    status: 'confirmed',
  });

  for (const reservation of reservations) {
    reservation.status = 'cancelled';
    await reservation.save();
  }

  return cls;
};

export { getAll, getById, create, update, remove };
