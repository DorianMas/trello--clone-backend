const { TaskSchema } = require('../tasks.schema')

function validateTask(request, response, next) {
  const id = parseInt(request.params.id)
  const task = TaskSchema.tasks.find((task) => task.id === id)

  if (!task) {
    return response.status(404).send('task not found')
  }

  request.task = task
  next()
}

module.exports.validateTask = validateTask
