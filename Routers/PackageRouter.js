const express = require('express')
const router = express.Router()

const {
   CreatePackage, 
   GetAllPackages, 
   GetPackageById,
   UpdatePackage,
   
   DeletePackageCollection,
   DeletePackage,
   GetAllPackagesWithCourse
} = require('../Controllers/PackageController')

router.post('/createpackage', CreatePackage)
router.get('/getpackages', GetAllPackages)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse)
router.get('/getpackage/:id', GetPackageById)
router.patch('/updatepackage/:id', UpdatePackage)
router.delete('/deletepackage/:id', DeletePackage)
router.delete('/deletepackagecollection', DeletePackageCollection)

module.exports = router