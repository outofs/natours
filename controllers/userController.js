const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

/// FOR DISC STORAGE
// const multerStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/img/users');
//   },
//   filename: (req, file, callback) => {
//     // argument "file" is an argument "req.file" which consist information about file we choose
//     const extension = file.mimetype.split('/')[1];

//     // structure of filename: user-(id)-(timestamp).(extension)
//     callback(null, `user-${req.user.id}-${Date.now()}.${extension}`);
//   },
// });

/// FOR MEMORY STORAGE
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else
    callback(
      new AppError('Not an image! Please upload only images.', 400),
      false
    );
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = el;
//   });
//   return newObj;
// };

exports.uploadUserPhoto = upload.single('photo');

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

// Do not update passwords with this
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword.',
        400
      )
    );
  }

  // const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const user = await User.findById(req.user.id);
  // Choosing updateable fields
  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (req.file) user.photo = req.file.filename;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
