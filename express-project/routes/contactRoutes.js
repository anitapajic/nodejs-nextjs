const express = require('express');
const router = express.Router();
const {
    getContactById, 
    createContact, 
    updateContactById, 
    deleteContactById,
    getPaginatedContacts
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getPaginatedContacts).post(createContact);
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById);
module.exports = router
