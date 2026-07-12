/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Redirecionamentos herdados do site antigo (Wix). Ativados quando o
    // domínio migrar. Preservam autoridade das URLs indexadas.
    return [
      { source: '/protocolo-5r', destination: '/o-que-e-5r', permanent: true },
      { source: '/5r', destination: '/o-que-e-5r', permanent: true },
    ];
  },
};
export default nextConfig;
