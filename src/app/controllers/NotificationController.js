import Notification from '../schemas/Notification';

class NotificationsController {
    async create(title, content, id_user) {
        await Notification.create({
            title,
            content,
            id_user,
            read: false
        });
    }

    async list(req, res) {
        const notifications = await Notification.find({
            id_user: req.id_resident,
            read: false
        })

        return res.json(notifications)
    }

    async delete(req, res) {
        const notification = await Notification.findById(req.params.id)
        notification.read = true;
        await notification.save()
        return res.status(204).send()
    }

}

export default new NotificationsController()