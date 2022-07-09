import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from '../databases/mongodb.js';
import joi from 'joi';

export async function createUser(req, res) {
  const usuario = req.body;

  const usuarioSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirm_password: joi.string().required()
  });

  const { error } = usuarioSchema.validate(usuario);

  if (error) {
    return res.sendStatus(422);
  }

  if (usuario.password != usuario.confirm_password) {
    return res.status(422).send('Digite a mesma senha nos dois campos');
  }

  const senhaCriptografada = bcrypt.hashSync(usuario.password, 10);

  await db.collection('usuarios').insertOne({ ...usuario, password: senhaCriptografada });
  res.status(201).send('Usuário criado com sucesso');
}

export async function loginUser(req, res) {
  const usuario = req.body;

  const usuarioSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const { error } = usuarioSchema.validate(usuario);

  if (error) {
    return res.sendStatus(422);
  }

  const user = await db.collection('usuarios').findOne({ email: usuario.email });
  const name = user.name;

  if (user && bcrypt.compareSync(usuario.password, user.password)) {
    const token = uuid();

    await db.collection('sessoes').insertOne({
      token,
      userId: user._id
    });

    return res.status(201).send({ token, name });
  } else {
    return res.status(401).send('Senha ou email incorretos!');
  }
}
