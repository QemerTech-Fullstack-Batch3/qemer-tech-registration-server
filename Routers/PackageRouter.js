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

router.post('/createpackage', CreatePackage)
router.get('/getpackages', GetAllPackages)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse)
router.get('/getpackage/:id', GetPackageById)
router.patch('/updatepackage/:id', UpdatePackage)
router.delete('/deletepackage/:id', DeletePackage)

module.exports = router