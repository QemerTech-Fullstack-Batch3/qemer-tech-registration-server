const express = require('express')
const router = express.Router()

const {
   CreatePackage, 
   GetAllPackages, 
   GetPackageById,
   UpdatePackage,
   DeletePackage,
   GetAllPackagesWithCourse
} = require('../Controllers/PackageController')

const {
   CacheAllPackages,
   CacheAllPackagesWithCourse,
   CachePackage
} = require('../Middlewares/caching')

router.post('/createpackage', CreatePackage)
router.get('/getpackages', CacheAllPackages, GetAllPackages)
router.get('/getpackageswithcourses', CacheAllPackagesWithCourse, GetAllPackagesWithCourse)
router.get('/getpackage/:id', CachePackage, GetPackageById)
router.patch('/updatepackage/:id', UpdatePackage)
router.delete('/deletepackage/:id', DeletePackage)

module.exports = router