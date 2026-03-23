import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // TODO: Integrate LLM here
  // Expected request body: { message: string }
  // Expected response: { reply: string }
  return new Response(
    JSON.stringify({ reply: 'El Playground estará disponible muy pronto. 🥷' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
