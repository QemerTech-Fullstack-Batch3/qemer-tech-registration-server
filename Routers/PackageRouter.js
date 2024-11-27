const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {checkPermission} = require('../Middlewares/rbacMiddleware')
const errorMiddleware = require('../Middlewares/errorMiddleware')
const {
   CreatePackage, 
   GetAllPackages, 
   GetPackageById,
   UpdatePackage,
   DeletePackage,
   GetAllPackagesWithCourse
} = require('../Controllers/PackageController')

router.post('/createpackage', authenticateToken, checkPermission('create_record'), CreatePackage, errorMiddleware)
router.get('/getpackages', GetAllPackages, errorMiddleware)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse, errorMiddleware)
router.get('/getpackage/:id', GetPackageById, errorMiddleware)
router.patch('/updatepackage/:id', authenticateToken, checkPermission('update_record'), UpdatePackage, errorMiddleware)
router.delete('/deletepackage/:id', authenticateToken, checkPermission('delete_record'), DeletePackage, errorMiddleware)

module.exports = router