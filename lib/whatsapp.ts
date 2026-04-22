const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491157660036";

export function buildWhatsAppLink(message?: string): string {
  const defaultMessage =
    "Hola Gonzalo! Vi tu página de Gonzalo Legarda Cocina Judía y me gustaría consultar sobre un evento 🎉";
  const encoded = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

export function buildEventWhatsAppLink(eventName: string): string {
  const message = `Hola Gonzalo! Vi tu página y me gustaría consultar sobre un evento de ${eventName} 🎉`;
  return buildWhatsAppLink(message);
}
