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
  const { category, title, content } = TaskData
  const { rows } = await Pool.query(
    `INSERT INTO tasks(category,title,content) 
      VALUES($1,$2,$3) RETURNING *`,
    [category, title, content],
  )

  return rows[0]
}

async function update(id, updateTaskData) {
  const { category, title, content } = updateTaskData

  const { rows } = await Pool.query(
    `
        UPDATE tasks
        SET 
        category=$1, title=$2, content=$3
        WHERE id=$4
        RETURNING id,category, title, content
      `,
    [category, title, content, id],
  )
  return rows[0]
}

async function remove(id) {
  const { rows } = await Pool.query(
    `
      DELETE FROM tasks
      WHERE id=$1
      RETURNING category, title, content
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
