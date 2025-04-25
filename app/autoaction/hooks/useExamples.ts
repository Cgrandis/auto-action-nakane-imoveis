import { useEffect, useRef, useState } from 'react';

export function useExamples() {
  const [profession, setProfession] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [examples, setExamples] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const fetchExamples = async () => {
    const res = await fetch('/autoaction/api/examples/list');
    const data = await res.json();
    setExamples(data);
  };

  useEffect(() => {
    fetchExamples();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? '/autoaction/api/examples/update' : '/autoaction/api/examples/create';

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, profession, title, description }),
    });

    setProfession('');
    setTitle('');
    setDescription('');
    setEditingId(null);
    fetchExamples();
  };

  const handleEdit = (example: any) => {
    setProfession(example.profession);
    setTitle(example.title);
    setDescription(example.description);
    setEditingId(example.id);
    setTimeout(() => autoResizeTextarea(), 0);
  };

  const handleDelete = async (id: number) => {
    await fetch('/autoaction/api/examples/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchExamples();
  };

  const autoResizeTextarea = () => {
    const el = descriptionRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return {
    profession, setProfession,
    title, setTitle,
    description, setDescription,
    examples, editingId,
    descriptionRef,
    handleSubmit, handleEdit, handleDelete
  };
}