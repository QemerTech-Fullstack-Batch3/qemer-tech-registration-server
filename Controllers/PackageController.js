const Package = require('../Models/PackageModel')
const Course = require('../Models/CourseModel')

exports.CreatePackage = async (req, res, next) => {
  try {
    const { packageName, description, courses } = req.body;
    if (!packageName || !description || !courses) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingPackage = await Package.findOne({ packageName });
    if (existingPackage) {
      return res.status(400).json({ message: 'A package with this name already exists' });
    }

    const coursesExist = await Course.find({ _id: { $in: courses } });
    if (coursesExist.length !== courses.length) {
      return res.status(400).json({ message: 'One or more courses do not exist' });
    }

    const newPackage = new Package({
      packageName,
      description,
      courses
    });
    
    await newPackage.save();
    const populatedPackage = await Package.findById(newPackage._id).populate('courses');
    res.status(201).json(newPackage);
  } catch (err) {
    next(err)
  }
};

exports.GetAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find()
    res.json(packages)
  } catch (err) {
    next(err)
  }
}
exports.GetAllPackagesWithCourse = async (req, res, next) => {
  try {
    const populatedPackages = await Package.find().populate('courses', 'courseName')
    res.json(populatedPackages)
  } catch (err) {
    next(err)
  }
}
exports.GetPackageById = async (req, res, next) => {
  try {
    const package = await Package.findById(req.params.id).populate('courses')
    if (!package) return res.status(404).json({ message: 'Package not found' })
    res.json(package)
  } catch (err) {
    next(err)
  }
}
exports.UpdatePackage = async (req, res, next) => {
  try {
    const { packageName, description, courses } = req.body;
    
    if (courses) {
      const coursesExist = await Course.find({ _id: { $in: courses } });
      if (coursesExist.length !== courses.length) {
        return res.status(400).json({ message: 'One or more courses do not exist' });
      }
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, 
      { packageName, description, courses }, 
      { new: true, runValidators: true }
    ).populate('courses', 'courseName');

    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPackage);
  } catch (err) {
    next(err)
  }
};

exports.DeletePackage = async (req, res, next) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id)
    if(!deletedPackage){
      return res.status(404).send('Package not found')
    }
    res.status(200).send('Package deleted succesfully')
  } catch (err) {
    next(err)
  }
}

exports.DeletePackageCollection = async (req, res) => {
  try {
    await Package.deleteMany();
    res.status(200).send("Package collection deleted Succesfully.")
  } catch (error) {
    console.error("Error while deleting Package collection") 
    res.status(501).send("An error occured while deleting Package collection.")
  }
}