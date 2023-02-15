const { Pool } = require('../pool')

async function findAll() {
  const { rows } = await Pool.query('SELECT * FROM tasks')
  return rows
}

async function findOne(id) {
  const { rows } = await Pool.query('SELECT * FROM tasks WHERE id=$1', [id])
  return rows[0]
}

async function create(TaskData) {
  const { state, title, content } = TaskData
  const { rows } = await Pool.query(
    `INSERT INTO tasks(state,title,content) 
      VALUES($1,$2,$3) RETURNING *`,
    [state, title, content],
  )

  return rows[0]
}

async function update(id, updateTaskData) {
  const { state, title, content } = updateTaskData

  const { rows } = await Pool.query(
    `
        UPDATE tasks
        SET 
        state=$1, title=$2, content=$3
        WHERE id=$4
        RETURNING id,state, title, content
      `,
    [state, title, content, id],
  )
  return rows[0]
}

async function remove(id) {
  const { rows } = await Pool.query(
    `
      DELETE FROM tasks
      WHERE id=$1
      RETURNING state, title, content
    `,
    [id],
  )

  return rows[0]
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
