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
// const {
//    CacheAllPackages,
//    CacheAllPackagesWithCourse,
//    CachePackage
// } = require('../Middlewares/caching')

router.post('/createpackage', authenticateToken, checkPermission('create_record'), CreatePackage)
router.get('/getpackages', GetAllPackages)
router.get('/getpackageswithcourses', GetAllPackagesWithCourse)
router.get('/getpackage/:id', GetPackageById)
router.patch('/updatepackage/:id', authenticateToken, checkPermission('update_record'), UpdatePackage)
router.delete('/deletepackage/:id', authenticateToken, checkPermission('delete_record'), DeletePackage)

module.exports = router