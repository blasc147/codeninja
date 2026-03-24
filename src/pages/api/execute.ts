import type { APIRoute } from 'astro';

export const prerender = false;

// Wandbox — free, no API key required
const WANDBOX_URL = 'https://wandbox.org/api/compile.json';

const LANG_CONFIG: Record<string, { compiler: string; filename: string }> = {
  java:   { compiler: 'openjdk-head',    filename: 'Main.java' },
  c:      { compiler: 'gcc-head',        filename: 'main.c'    },
  python: { compiler: 'cpython-3.12.0',  filename: 'main.py'   },
};

export const POST: APIRoute = async ({ request }) => {
  let body: { code: string; language: string; stdin?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const config = LANG_CONFIG[body.language];
  if (!config) {
    return json({ error: `Unsupported language: ${body.language}` }, 400);
  }

  let res: Response;
  try {
    res = await fetch(WANDBOX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: config.compiler,
        code: body.code,
        stdin: body.stdin ?? '',
        filename: config.filename,
        'save': false,
      }),
    });
  } catch {
    return json({ error: 'No se pudo conectar con el servidor de ejecución.' }, 502);
  }

  if (!res.ok) {
    return json({ error: `Error del servidor: ${res.status}` }, 502);
  }

  const data = await res.json() as {
    status:           string;
    program_output:   string | undefined;
    program_error:    string | undefined;
    compiler_error:   string | undefined;
    compiler_message: string | undefined;
  };

  const exitCode = data.status === '0' ? 0 : 1;

  return json({
    stdout:        data.program_output  ?? '',
    stderr:        data.program_error   ?? '',
    compile_error: data.compiler_error  ?? data.compiler_message ?? '',
    exit_code:     exitCode,
  });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
