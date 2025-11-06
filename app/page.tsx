import { getTasks, createTask, updateTask, deleteTaskById } from './actions/tasks';

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


  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
      <div className='d-flex'>
        <form action={handleSubmit} className="my-4 flex w-full ">
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
          className='border p-2 mt-4 ml-2'
          ></textarea>

          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-2 rounded"
          >
            Adicionar
          </button>
        </form>
      </div>

      <ul className="space-y-4">
        {tasks.map((t: {id: number; title: string; description: string}) => (
          <li key={t.id} className="border-b py-1">
            <form action={handlUpdate}>
            <input type="hidden" name="id" value={t.id.toString()} />
            <h3 className='font-bold'>{t.title}</h3>
           <p>{t.description}</p> 

                <input
                name="title"
                defaultValue={t.title}
                className="border p-2 "
              />

              <textarea
                name="description"
                defaultValue={t.description}
                className="border p-2 mt-2"
              />

           <button
                type="submit"
                className="ml-2 bg-blue-500 text-white p-2 rounded"
              >
                editar
              </button>
              </form>

              

              <form action={handleDelete}>
            <input type="hidden" name="id" value={t.id.toString()} />
            <button
              type="submit"
              className="ml-1 bg-blue-500 text-white p-2 rounded "
            >
              Delete
            </button>
          </form>
            

          </li>
        ))}
        
      </ul>
    </main>
  );
}