const tasksRepository = require('./tasks.repository')

async function findAll() {
  const tasks = await tasksRepository.findAll()
  return tasks
}

async function findOne(id) {
  const task = await tasksRepository.findOne(id)
  if (!task) {
    throw new Error('task not found')
  }
  return task
}

async function create(createTaskBody) {
  const task = await tasksRepository.create(createTaskBody)
  return task
}

// Ajouter des vérifications
async function update(id, updateTaskBody) {
  const task = await tasksRepository.update(id, updateTaskBody)
  return task
}

// Ajouter des vérifications
async function remove(id) {
  const task = await tasksRepository.remove(id)
  return task
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
