import * as Yup from 'yup';

const YupFavor = {
    list: Yup.object().shape({
        id: Yup.number().positive().integer().required(),
    }),

    store: Yup.object().shape({
        id_building: Yup.number().positive().integer().required(),
        id_category: Yup.number().positive().integer().required(),
        final_date: Yup.date().required(),
        title: Yup.string().required(),
        description: Yup.string().required(),
    }),

    update: Yup.object().shape({
        id_category: Yup.number().positive().integer().required(),
        final_date: Yup.date().required(),
        title: Yup.string().required(),
        description: Yup.string().required(),
    }),

    delete: Yup.object().shape({
        id: Yup.number().positive().integer().required(),
    })
}

export default YupFavor;