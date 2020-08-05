const{
    sendTopics
} = require('../controllers/topics-controller')

const topicsRouter = express.Router();


topicsRouter.route('/').get(fetchTopics)











module.exports = topicsRouter