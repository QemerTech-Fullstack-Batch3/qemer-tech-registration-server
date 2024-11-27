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
const {
   CacheAllPackages,
   CacheAllPackagesWithCourse,
   CachePackage
} = require('../Middlewares/caching')

router.post('/createpackage', authenticateToken, checkPermission('create_record'), CreatePackage, errorMiddleware)
router.get('/getpackages', CacheAllPackages, GetAllPackages, errorMiddleware)
router.get('/getpackageswithcourses', CacheAllPackagesWithCourse, GetAllPackagesWithCourse, errorMiddleware)
router.get('/getpackage/:id', CachePackage, GetPackageById, errorMiddleware)
router.patch('/updatepackage/:id', authenticateToken, checkPermission('update_record'), UpdatePackage, errorMiddleware)
router.delete('/deletepackage/:id', authenticateToken, checkPermission('delete_record'), DeletePackage, errorMiddleware)

module.exports = router