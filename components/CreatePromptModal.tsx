import React, { useState, useRef, useEffect } from 'react';
import { Category, Platform, Prompt, User } from '../types';
import { X, Sparkles, Save, Image as ImageIcon, Upload } from 'lucide-react';

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: Omit<Prompt, 'id' | 'likes' | 'views' | 'createdAt'>) => void;
  user: User | null;
  initialData?: Prompt;
}

const CreatePromptModal: React.FC<CreatePromptModalProps> = ({ isOpen, onClose, onSubmit, user, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    platform: Platform.ChatGPT,
    category: Category.General,
    tags: ''
  });
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        content: initialData.content,
        imageUrl: initialData.imageUrl,
        platform: initialData.platform,
        category: initialData.category,
        tags: initialData.tags.join(', ')
      });
      if (initialData.imageUrl) {
        setImagePreview(initialData.imageUrl);
      }
    } else {
      // Resetear formulario al crear nuevo
      setFormData({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
        platform: Platform.ChatGPT,
        category: Category.General,
        tags: ''
      });
      setImagePreview(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen');
        return;
      }
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }
      // Crear preview con base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData({ ...formData, imageUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onSubmit({
      ...formData,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
      author: user.displayName || 'Anónimo',
      authorId: user.uid,
      authorPhoto: user.photoURL,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    });
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      platform: Platform.ChatGPT,
      category: Category.General,
      tags: ''
    });
    setImagePreview(null);
    setImageMode('url');
  };

  const clearImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-surface border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Sparkles size={20} />
            </div>
            <h2 className="text-lg font-bold text-white">
              {initialData ? 'Editar Prompt' : 'Publicar Nuevo Prompt'}
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="create-prompt-form" onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Título del Prompt</label>
              <input
                required
                type="text"
                placeholder="Ej: Experto en Marketing Digital..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Plataforma</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none"
                  value={formData.platform}
                  onChange={e => setFormData({...formData, platform: e.target.value as Platform})}
                >
                  {Object.values(Platform).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Categoría</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as Category})}
                >
                  {Object.values(Category).filter(c => c !== Category.All).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Section */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Imagen del Resultado</label>

              {/* Toggle between URL and Upload */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => { setImageMode('url'); clearImage(); }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    imageMode === 'url'
                      ? 'bg-primary text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon size={16} className="inline mr-2" />
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => { setImageMode('upload'); clearImage(); }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    imageMode === 'upload'
                      ? 'bg-primary text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload size={16} className="inline mr-2" />
                  Subir Imagen
                </button>
              </div>

              {imageMode === 'url' ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <ImageIcon size={18} />
                  </div>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full pl-10 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>
              ) : (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-900 hover:bg-slate-800 hover:border-primary/50 transition-all"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); clearImage(); }}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="text-slate-500 mb-2" />
                        <span className="text-sm text-slate-400">Haz clic para subir una imagen</span>
                        <span className="text-xs text-slate-500 mt-1">PNG, JPG, GIF hasta 5MB</span>
                      </>
                    )}
                  </label>
                </div>
              )}
              <p className="text-xs text-slate-500 mt-1">Deja vacío para usar una imagen por defecto.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Descripción Corta</label>
              <input
                required
                type="text"
                placeholder="Describe brevemente qué hace este prompt..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Prompt (Contenido)</label>
              <textarea
                required
                rows={6}
                placeholder="Escribe el prompt completo aquí..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Etiquetas (separadas por coma)</label>
              <input
                type="text"
                placeholder="marketing, seo, redacción..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="create-prompt-form"
            className="px-6 py-2 bg-primary hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Save size={18} /> Publicar Prompt
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatePromptModal;
