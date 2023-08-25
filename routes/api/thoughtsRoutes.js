const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
}  = require("../../controllers/thoughtController")

router.route("/").get(getThought).post(createThought)

router.route("thoughts/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought)

router.route("/thoughts/:thoughtId/reactions").post(createReaction).delete(deleteReaction)

module.exports = router;