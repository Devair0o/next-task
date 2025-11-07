import { getTasks, createTask, updateTask, deleteTaskById, completedTask } from './actions/tasks';

export default async function Home() {
  const tasks = await getTasks();

  async function handleSubmit(formData: FormData) {
    'use server';
    await createTask(formData);
  }

  async function handlUpdate(formData: FormData) {
    'use server';
    await updateTask(formData);
  }

  async function handleDelete(formData: FormData) {
    'use server';
    await deleteTaskById(formData);
  }

  async function handleCompletedTask(formData: FormData) {
    'use server';
    await completedTask(formData);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Lista de Tarefas</h1>

      <form action={handleSubmit} className="my-4 flex w-full">
        <input
          name="title"
          placeholder="Nova tarefa"
          required
          className="border p-2 mt-4 mr-2"
        />
        <textarea
          name="description"
          placeholder="Descrição da tarefa"
          required
          className="border p-2 mt-4 ml-2"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded h-13 w-27 mt-10"
        >
          Adicionar
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map(
          (t: {
            id: number;
            title: string;
            description: string;
            completed: boolean;
          }) => (
            <li key={t.id} className="border-b py-10 ">

              <div className="w-full mb-4">
                <h3>
                  {t.title}
                </h3>
                <p>
                  {t.description}
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Status:{' '}
                  <span
                    className={`${t.completed ? 'text-green-600' : 'text-yellow-600'
                      }`}
                  >
                    {t.completed ? 'Concluída' : 'Pendente'}
                  </span>
                </p>
              </div>

              <div className='flex w-full flex-row justify-start items-center gap-1'>
                <form
                  action={handlUpdate}
                  className=" flex flex-row justify-start gap-1 items-center"
                >
                  <input type="hidden" name="id" value={t.id.toString()} />
                  <div className="flex  gap-1 flex-row">
                    <input
                      name="title"
                      defaultValue={t.title}
                      className="border p-2 mr-2"
                    />
                    <textarea
                      name="description"
                      defaultValue={t.description}
                      className="border p-2  mr-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="l-2 bg-blue-500 text-white p-2 rounded h-13 w-27 "
                  >
                    Editar
                  </button>
                </form>

                <form action={handleDelete} className="">
                  <input type="hidden" name="id" value={t.id.toString()} />
                  <button
                    type="submit"
                    className="bg-red-500 text-white p-2 rounded h-13 w-27"
                  >
                    Delete
                  </button>
                </form>

                <form action={handleCompletedTask} className="">
                  <input type="hidden" name="id" value={t.id.toString()} />
                  <input
                    type="hidden"
                    name="completed"
                    value={(!t.completed).toString()}
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded h-13 w-27"
                  >
                    {t.completed ? 'Desmarcar' : 'Concluir'}
                  </button>
                </form>
              </div>
            </li>
          )
        )}
      </ul>
    </main>
  );
}