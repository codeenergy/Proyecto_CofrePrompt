import { useState, useRef, useEffect } from 'react';
import { Category, Platform, Prompt, User } from '../types';
import { X, Sparkles, Save, Image as ImageIcon, Upload, AlertCircle, Check } from 'lucide-react';

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
    customPlatform: '',
    category: Category.General,
    tags: ''
  });
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [useCustomPlatform, setUseCustomPlatform] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        customPlatform: '',
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
        customPlatform: '',
        category: Category.General,
        tags: ''
      });
      setImagePreview(null);
      setErrors({});
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setErrors({...errors, imageUrl: 'Por favor selecciona un archivo de imagen válido'});
        return;
      }
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({...errors, imageUrl: 'La imagen no debe superar los 5MB'});
        return;
      }
      // Crear preview con base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData({ ...formData, imageUrl: base64 });
        setErrors({...errors, imageUrl: ''});
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar título (mínimo 10 caracteres)
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'El título no puede exceder 100 caracteres';
    }

    // Validar descripción (mínimo 20 caracteres)
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    } else if (formData.description.trim().length > 200) {
      newErrors.description = 'La descripción no puede exceder 200 caracteres';
    }

    // Validar contenido del prompt (mínimo 50 caracteres, máximo 5000)
    if (!formData.content.trim()) {
      newErrors.content = 'El contenido del prompt es obligatorio';
    } else if (formData.content.trim().length < 50) {
      newErrors.content = 'El prompt debe tener al menos 50 caracteres para ser útil';
    } else if (formData.content.trim().length > 5000) {
      newErrors.content = 'El prompt no puede exceder 5000 caracteres';
    }

    // Validar imagen
    if (!formData.imageUrl.trim() && !imagePreview) {
      newErrors.imageUrl = 'Debes agregar una imagen o URL de imagen';
    }

    // Validar etiquetas (mínimo 3)
    const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (tags.length < 3) {
      newErrors.tags = 'Debes agregar al menos 3 etiquetas separadas por comas';
    } else if (tags.length > 10) {
      newErrors.tags = 'No puedes agregar más de 10 etiquetas';
    }

    // Validar plataforma personalizada si está activada
    if (useCustomPlatform && !formData.customPlatform.trim()) {
      newErrors.customPlatform = 'Debes especificar el nombre de la plataforma';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isSubmitting) return;

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const finalPlatform = useCustomPlatform && formData.customPlatform
        ? formData.customPlatform
        : formData.platform;

      await onSubmit({
        ...formData,
        platform: finalPlatform as Platform,
        imageUrl: formData.imageUrl || imagePreview || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
        author: user.displayName || 'Anónimo',
        authorId: user.uid,
        authorPhoto: user.photoURL,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
      });

      setErrors({});
      setFormData({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
        platform: Platform.ChatGPT,
        customPlatform: '',
        category: Category.General,
        tags: ''
      });
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      setErrors({submit: 'Hubo un error al guardar el prompt. Por favor intenta de nuevo.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCharacterCount = (text: string, min: number, max: number) => {
    const count = text.length;
    const isValid = count >= min && count <= max;
    const color = count < min ? 'text-red-400' : isValid ? 'text-green-400' : 'text-red-400';
    return (
      <span className={`text-xs ${color}`}>
        {count}/{max} caracteres {!isValid && count < min && `(mínimo ${min})`}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {initialData ? 'Editar Prompt' : 'Publicar Nuevo Prompt'}
              </h2>
              <p className="text-xs text-slate-400">Completa todos los campos obligatorios</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          <form id="create-prompt-form" onSubmit={handleSubmit} className="space-y-5">

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Título del Prompt <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Experto en Marketing Digital para Redes Sociales..."
                className={`w-full bg-slate-800 border ${errors.title ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all`}
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.title && (
                  <span className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.title}
                  </span>
                )}
                <div className="ml-auto">
                  {getCharacterCount(formData.title, 10, 100)}
                </div>
              </div>
            </div>

            {/* Plataforma y Categoría */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Plataforma <span className="text-red-400">*</span>
                </label>
                {!useCustomPlatform ? (
                  <>
                    <select
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                      value={formData.platform}
                      onChange={e => setFormData({...formData, platform: e.target.value as Platform})}
                    >
                      {Object.values(Platform).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setUseCustomPlatform(true)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 mt-1"
                    >
                      + Usar plataforma personalizada
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Nombre de la plataforma..."
                      className={`w-full bg-slate-800 border ${errors.customPlatform ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all`}
                      value={formData.customPlatform}
                      onChange={e => setFormData({...formData, customPlatform: e.target.value})}
                    />
                    <button
                      type="button"
                      onClick={() => setUseCustomPlatform(false)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 mt-1"
                    >
                      ← Volver a lista predefinida
                    </button>
                    {errors.customPlatform && (
                      <span className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.customPlatform}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Categoría <span className="text-red-400">*</span>
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as Category})}
                >
                  {Object.values(Category).filter(c => c !== Category.All).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Imagen del Resultado <span className="text-red-400">*</span>
              </label>

              {/* Toggle between URL and Upload */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => { setImageMode('url'); clearImage(); }}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    imageMode === 'url'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <ImageIcon size={16} className="inline mr-2" />
                  URL de Imagen
                </button>
                <button
                  type="button"
                  onClick={() => { setImageMode('upload'); clearImage(); }}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    imageMode === 'upload'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Upload size={16} className="inline mr-2" />
                  Subir Archivo
                </button>
              </div>

              {imageMode === 'url' ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <ImageIcon size={18} />
                  </div>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className={`w-full pl-10 bg-slate-800 border ${errors.imageUrl ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all`}
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
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed ${errors.imageUrl ? 'border-red-500' : 'border-slate-700'} rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all group`}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full p-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); clearImage(); }}
                          className="absolute top-3 right-3 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="text-slate-500 group-hover:text-indigo-400 mb-3 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Haz clic para subir una imagen</span>
                        <span className="text-xs text-slate-500 mt-1">PNG, JPG, GIF hasta 5MB</span>
                      </>
                    )}
                  </label>
                </div>
              )}
              {errors.imageUrl && (
                <span className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.imageUrl}
                </span>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción Corta <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="Describe brevemente qué hace este prompt y para qué sirve..."
                className={`w-full bg-slate-800 border ${errors.description ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none`}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <span className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.description}
                  </span>
                )}
                <div className="ml-auto">
                  {getCharacterCount(formData.description, 20, 200)}
                </div>
              </div>
            </div>

            {/* Contenido del Prompt */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contenido del Prompt <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={8}
                placeholder="Escribe el prompt completo aquí. Sé específico y detallado para que los usuarios puedan usarlo fácilmente..."
                className={`w-full bg-slate-800 border ${errors.content ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 font-mono text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none`}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.content && (
                  <span className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.content}
                  </span>
                )}
                <div className="ml-auto">
                  {getCharacterCount(formData.content, 50, 5000)}
                </div>
              </div>
            </div>

            {/* Etiquetas */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Etiquetas <span className="text-red-400">*</span>
                <span className="text-xs text-slate-500 ml-2">(mínimo 3, separadas por comas)</span>
              </label>
              <input
                type="text"
                placeholder="marketing, seo, redacción, copywriting, redes sociales..."
                className={`w-full bg-slate-800 border ${errors.tags ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all`}
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
              {errors.tags ? (
                <span className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.tags}
                </span>
              ) : (
                <span className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Check size={12} className="text-green-400" />
                  {formData.tags.split(',').filter(t => t.trim()).length} etiquetas añadidas
                </span>
              )}
            </div>

            {/* Error de submit */}
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <span className="text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.submit}
                </span>
              </div>
            )}

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="text-xs text-slate-500">
            <span className="text-red-400">*</span> Campos obligatorios
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-slate-400 hover:text-white font-medium transition-colors hover:bg-slate-800 rounded-lg disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="create-prompt-form"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {initialData ? 'Actualizar' : 'Publicar Prompt'}
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatePromptModal;
