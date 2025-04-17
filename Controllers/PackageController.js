const Package = require('../Models/PackageModel')
const Course = require('../Models/CourseModel');
const { redisClient } = require('../Middlewares/caching');

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
    res.status(500).send("An error occurred creating packages");
    console.log(err)
  }
};

exports.GetAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find()
    if(redisClient.isOpen){
      redisClient.setEx('packages', 3600 , JSON.stringify(packages))
    }
    res.json(packages)
  } catch (err) {
    res.status(500).send("An error occurred fetching all packages");
    console.log(err)
  }
}
exports.GetAllPackagesWithCourse = async (req, res, next) => {
  try {
    const populatedPackages = await Package.find().populate('courses', 'courseName')

    if(redisClient.isOpen){
      redisClient.setEx('populatedPackages', 3600, JSON.stringify(populatedPackages))
    }
    res.json(populatedPackages)
  } catch (err) {
    res.status(500).send("An error occurred fetching all packages with populated course");
    console.log(err)
  }
}
exports.GetPackageById = async (req, res, next) => {
  try {
    const packageId = req.params.id
    const package = await Package.findById(packageId).populate('courses')
    if (!package) return res.status(404).json({ message: 'Package not found' })

    if(redisClient.isOpen){
      await redisClient.setEx(packageId, 300 , JSON.stringify(package))
    }
    res.json(package)
  } catch (err) {
    res.status(500).send("An error occurred fetching package id");
    console.log(err)
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
    res.status(500).send("An error occurred updating package");
    console.log(err)
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
    res.status(500).send("An error occurred deleting packages");
    console.log(err)
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