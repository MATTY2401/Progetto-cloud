const express = require('express');
const router = express.Router();


// handling errori in caso di pagine non esistenti
router.get('*', (req, res) => {
    res.status(404).render('error');
});

module.exports = router;