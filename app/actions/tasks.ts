'use server';

import API  from '@/lib/API';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
try{
  const { data } = await API.get('/tasks');
return data;
} catch (error){
    console.error('Error fetching tasks:', error);
}
}

export async function createTask(formData: FormData) {
    try{
  const title = formData.get('title');
  const description = formData.get('description');
  const { data } = await API.post('/tasks', { title, description });
  revalidatePath('/');
  return { success: true, task:data };
    } catch (error) {
        console.error('Error a criar a task', error);
        return {success: false};
    }
}

export async function updateTask(formData: FormData) {
  try {
    const id = formData.get('id');
    const title = formData.get('title');
    const description = formData.get('description');

    if (!id) throw new Error('Task ID is required');

    const { data } = await API.put(`/tasks/${id}`, { title, description });
    revalidatePath('/');
    return { success: true, task: data };
  } catch (error) {
    console.error('Error ao editar a task:', error);
    return { success: false };
  }
}

  export async function deleteTaskById (formData : FormData) {
  try {
    const id = formData.get('id');

    if (!id) throw new Error('Task ID is required');

    await API.delete(`/tasks/${id}`);
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error ao deletar a task:', error);
    return { success: false };
  }
    
}