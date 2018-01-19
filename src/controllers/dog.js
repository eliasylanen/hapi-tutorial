const Dog = require('../models/Dog');

/**
 * List dogs
 */
exports.list = async (req, h) => {
  try {
    const dogs = await Dog.find({}).exec();
    return { dogs };
  } catch (err) {
    return { err };
  }
};

/**
 * Get dog by ID
 */
exports.get = async (req, h) => {
  try {
    const dog = await Dog.findById(req.params.id).exec();
    return !dog ? { message: 'Dog not found' } : { dog };
  } catch (err) {
    return { err };
  }
};

/**
 * POST a dog
 */
exports.create = async (req, h) => {
  const { name, breed, age, image } = req.payload;

  const dogData = {
    name,
    breed,
    age,
    image,
  };

  try {
    const dog = await Dog.create(dogData);
    return { message: 'Dog created succesfully', dog };
  } catch (err) {
    return { err };
  }
};

/**
 * PUT / update dog by ID
 */
exports.update = async (req, h) => {
  console.log(req);
  try {
    const dog = await Dog.findById(req.params.id).exec();

    console.log(dog);

    if (!dog) return { err: 'Dog not found' };

    const { name, breed, age, image } = req.payload;

    dog.name = name || dog.name;
    dog.breed = breed || dog.breed;
    dog.age = age || dog.age;
    dog.image = image || dog.image;

    console.log(dog);

    await dog.save();

    return { message: 'Dog data updated succesfully' };
  } catch (err) {
    return { err };
  }
};

/**
 * Delete dog by ID
 */
exports.remove = async (req, h) => {
  try {
    const dog = await Dog.findById(req.params.id).exec();

    if (!dog) return { err: 'Dog not found' };

    await dog.remove();

    return { success: true };
  } catch (err) {
    return { err };
  }
};
