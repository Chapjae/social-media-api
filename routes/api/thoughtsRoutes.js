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

router.route("/").get(getThought)

router.route("/createthought/:userId").post(createThought)

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(createReaction).delete(deleteReaction)

module.exports = router;