import * as Yup from 'yup';

const YupActive = Yup.object().shape({
  id_resident: Yup.number().positive().integer().required(),
  active: Yup.boolean().required(),
});

export default YupActive;
