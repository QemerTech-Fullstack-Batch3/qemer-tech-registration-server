const express = require('express')
const router = express.Router()

const errorMiddleware = require('../Middlewares/errorMiddleware')
const {
   CreatePackage, 
   GetAllPackages, 
   GetPackageById,
   UpdatePackage,
   DeletePackage,
   GetAllPackagesWithCourse
} = require('../Controllers/PackageController')

router.post('/createpackage', CreatePackage, errorMiddleware)
router.get('/getpackages', GetAllPackages, errorMiddleware)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse, errorMiddleware)
router.get('/getpackage/:id', GetPackageById, errorMiddleware)
router.patch('/updatepackage/:id', UpdatePackage, errorMiddleware)
router.delete('/deletepackage/:id', DeletePackage, errorMiddleware)

module.exports = router