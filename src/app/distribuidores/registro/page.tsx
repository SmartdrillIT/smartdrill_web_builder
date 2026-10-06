'use client';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { User, Mail, Phone, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerDistributor } from '@/services/auth.service';
import { setSession } from '@/services/token.service';
import { ApiError, type RegisterData } from '@/types/api';
import AuthShell from '@/components/distributors/AuthShell';
import { useLanguage } from '@/context/LanguageContext';

const EMPTY_FORM: RegisterData = {
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
};

export default function DistributorRegister() {
  const router = useRouter();
  const { t } = useLanguage();
  const content = t("authRegistro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<RegisterData>(EMPTY_FORM);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica de contraseñas en el cliente
    if (formData.password !== formData.password_confirmation) {
      setError(content.mismatch);
      setLoading(false);
      return;
    }

    try {
      const response = await registerDistributor(formData);

      // Guardamos el token que devuelve Laravel
      setSession(response.access_token, response.user);

      // Redirigir al dashboard tras registro exitoso
      router.push('/distribuidores/reparaciones');
    } catch (err) {
      // Si Laravel devuelve errores de validación, aquí se capturan
      setError(err instanceof ApiError ? err.message : content.errorCreate);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthShell
      title={content.title}
      subtitle={content.subtitle}
      glowClassName="bottom-[-10%] right-[-10%]"
      maxWidthClass="max-w-lg"
      error={error}
      footer={
        <Link href="/distribuidores/login" className="text-xs text-zinc-500 hover:text-orange-500 transition-colors uppercase">
          {content.footer}
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre Completo */}
          <div className="md:col-span-2 group relative">
            <div className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
              <User size="1.125rem" />
            </div>
            <input
              required
              name="name"
              type="text"
              placeholder={content.namePh}
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
            />
          </div>

          {/* Username */}
          <div className="group relative">
            <input
              required
              name="username"
              type="text"
              placeholder={content.userPh}
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 px-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
            />
          </div>

          {/* Teléfono */}
          <div className="group relative">
            <div className="absolute left-3 top-3 text-zinc-400">
              <Phone size="1.125rem" />
            </div>
            <input
              name="phone"
              type="text"
              placeholder={content.phonePh}
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 pl-10 px-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2 group relative">
            <div className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
              <Mail size="1.125rem" />
            </div>
            <input
              required
              name="email"
              type="email"
              placeholder={content.emailPh}
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="group relative">
            <div className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
              <Lock size="1.125rem" />
            </div>
            <input
              required
              name="password"
              type="password"
              placeholder={content.passPh}
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="group relative">
            <input
              required
              name="password_confirmation"
              type="password"
              placeholder={content.passPh2}
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 px-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 mt-4 font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size="1.125rem" /> : (
            <>
              <span>{content.submit}</span>
              <ArrowRight size="1rem" className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}
