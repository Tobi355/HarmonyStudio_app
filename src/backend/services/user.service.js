import User from '../models/User.js';
import AppError from '../utils/error.js';

const getAll = async () => {
  return User.find().sort({ createdAt: -1 });
};

const getById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found.', 404);
  return user;
};

const update = async (id, updates) => {
  const allowed = ['name', 'phone', 'role'];
  const filtered = {};
  for (const key of allowed) {
    if (updates[key] !== undefined) filtered[key] = updates[key];
  }

  const user = await User.findByIdAndUpdate(id, filtered, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new AppError('User not found.', 404);
  return user;
};

const remove = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError('User not found.', 404);
  return user;
};

export { getAll, getById, update, remove };
