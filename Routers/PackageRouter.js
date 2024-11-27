const express = require('express')
const router = express.Router()

<<<<<<< HEAD
const authenticateToken = require('../Middlewares/jwt_auth')
const {checkPermission} = require('../Middlewares/rbacMiddleware')
=======
const errorMiddleware = require('../Middlewares/errorMiddleware')
>>>>>>> Error-Handling-Middleware
const {
   CreatePackage, 
   GetAllPackages, 
   GetPackageById,
   UpdatePackage,
   DeletePackage,
   GetAllPackagesWithCourse
} = require('../Controllers/PackageController')

<<<<<<< HEAD
router.post('/createpackage', authenticateToken, checkPermission('create_record'), CreatePackage)
router.get('/getpackages', GetAllPackages)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse)
router.get('/getpackage/:id', GetPackageById)
router.patch('/updatepackage/:id', authenticateToken, checkPermission('update_record'), UpdatePackage)
router.delete('/deletepackage/:id', authenticateToken, checkPermission('delete_record'),DeletePackage)
=======
router.post('/createpackage', CreatePackage, errorMiddleware)
router.get('/getpackages', GetAllPackages, errorMiddleware)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse, errorMiddleware)
router.get('/getpackage/:id', GetPackageById, errorMiddleware)
router.patch('/updatepackage/:id', UpdatePackage, errorMiddleware)
router.delete('/deletepackage/:id', DeletePackage, errorMiddleware)
>>>>>>> Error-Handling-Middleware

module.exports = router