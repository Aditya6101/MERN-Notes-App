const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'Get Notes' });
});

router.post('/', (req, res) => {
  res.status(200).send({ msg: 'Create Note' });
});

router.put('/:id', (req, res) => {
  res.status(200).send({ msg: `update note ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).send({ msg: `delete note ${req.params.id}` });
});

module.exports = router;
