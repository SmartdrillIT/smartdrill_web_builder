'use client';
import { useState, type FormEvent } from 'react';
import { Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { loginDistributor } from '@/services/auth.service';
import { setSession } from '@/services/token.service';
import { ApiError, type LoginCredentials } from '@/types/api';
import AuthShell from '@/components/distributors/AuthShell';
import { useLanguage } from '@/context/LanguageContext';

export default function DistributorLogin() {
  const router = useRouter();
  const { t } = useLanguage();
  const content = t("authLogin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<LoginCredentials>({ username: '', password: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginDistributor(formData);

      // Guardamos el token y el usuario
      setSession(response.access_token, response.user);

      // Redirigir al dashboard
      router.push('/distribuidores/reparaciones');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : content.badCreds);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title={content.title}
      subtitle={content.subtitle}
      glowClassName="top-[-10%] left-[-10%]"
      error={error}
      footer={
        <Link href="/distribuidores/registro" className="text-xs text-zinc-500 hover:text-orange-500 transition-colors">
          {content.footer}
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="group relative">
          <div className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
            <User size="1.125rem" />
          </div>
          <input
            required
            type="text"
            placeholder={content.userPh}
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
          />
        </div>

        <div className="group relative">
          <div className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
            <Lock size="1.125rem" />
          </div>
          <input
            required
            type="password"
            placeholder={content.passPh}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-zinc-100 transition-all"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
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
