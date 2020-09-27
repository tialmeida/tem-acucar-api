import Item from '../models/Item';

class FavorsItemsController {
  async create(req, res) {
    const { idFavor } = req.params;

    await Item.create({
      item: req.body.item,
      id_favor: idFavor,
    });

    return res.status(200).send();
  }

  async list(req, res) {
    const { idFavor } = req.params;
    const items = await Item.findAll({
      where: { id_favor: idFavor },
    });

    return res.json(items);
  }

  async update(req, res) {
    const { idItem } = req.params;
    const item = await Item.findByPk(idItem);

    if (!item) {
      return res.status(404).send();
    }
    item.update(req.body);
    return res.status(204).send();
  }

  async delete(req, res) {
    const { idItem } = req.params;
    const item = await Item.findByPk(idItem);
    if (!item) {
      return res.status(404).send();
    }
    await item.destroy();
    return res.status(204).send();
  }
}

export default new FavorsItemsController();
