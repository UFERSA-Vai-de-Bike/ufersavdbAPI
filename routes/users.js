const express = require("express");
const router = express.Router();

const db = require("../db/users");

/* A ORDEM DA DECLARAÇÃO IMPORTA
*
* NÃO FAÇA:
* get('/:id,.....);
* get('/log/,.....);
*
* FAÇA:
* get('/log/,.....);
* get('/:id,.....);
* */

router.get('/sit/:id', db.changeSit);

router.get('/log', db.getUsersLog);
router.get('/log/:id', db.getUserLog);

router.get('/info', db.getInfos);
router.get('/info/:id', db.getInfo);
router.post('/info', db.updateUserInfo);

/**
 * @swagger
 * /users/:
 *    get:
 *      tags:
 *      - Users
 *      description: Return the list of all users
 */
router.get('/', db.getUsers);

/**
 * @swagger
 * /users/val:
 *    get:
 *      tags:
 *      - Users
 *      description: Return the list of all val users
 */
router.get('/val', db.getValUsers);

/**
 * @swagger
 * /users/n:
 *    get:
 *      tags:
 *      - Users
 *      description: Return the list of all usernames
 */
router.get('/n', db.getUserNames);

/**
 * @swagger
 * /users/:id:
 *    get:
 *      tags:
 *      - Users
 *      parameters:
 *      - name: id
 *        description: User Id
 *        required: true
 *        type: number
 *      description: Return the a specific user
 */
router.get('/:id', db.getUser);

/**
 * @swagger
 * /users/:
 *    post:
 *      tags:
 *      - Users
 *      description: Create an user
 */
router.post('/', db.createUser);

/**
 * @swagger
 * /users/login:
 *    post:
 *      tags:
 *      - Users
 *      description: Login into the application
 */
// add parameters
router.post('/login',db.login);

/**
 * @swagger
 * /users/signup:
 *    get:
 *      tags:
 *      - Users
 *      description: Sign up into the application
 */
// add parameters
router.post('/signup',db.signup);

/**
 * @swagger
 * /users/:
 *    put:
 *      tags:
 *      - Users
 *      description: Update an user
 */
// add parameters
router.put('/', db.updateUser);

/**
 * @swagger
 * /users/:
 *    delete:
 *      tags:
 *      - Users
 *      description: Remove all users
 */
router.delete('/', db.removeUsers);

/**
 * @swagger
 * /users/:id:
 *    delete:
 *      tags:
 *      - Users
 *      parameters:
 *      - name: id
 *        description: User Id
 *        required: true
 *        type: number
 *      description: Remove a specific user
 */
router.delete('/:id', db.removeUser);

module.exports = router;
