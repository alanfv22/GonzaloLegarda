export default function AdminPedidosPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h2 className="font-playfair font-bold text-2xl text-[#FDF6EC]">Pedidos</h2>
        <p className="font-dm-sans text-sm text-[#FDF6EC]/40 mt-1">Gestión de pedidos</p>
      </div>
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#C9973A]/10 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9973A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h3 className="font-playfair font-bold text-xl text-[#FDF6EC] mb-2">Próximamente</h3>
        <p className="font-dm-sans text-sm text-[#FDF6EC]/40 max-w-xs">
          El módulo de pedidos está en desarrollo y estará disponible pronto.
        </p>
      </div>
    </div>
  );
}
